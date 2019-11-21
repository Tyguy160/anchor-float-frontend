const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const stripe = require('stripe')('sk_test_b0MPemUYvtnsaU6aaHzyMKUA');

// Sitemap parsing imports
const uuid = require('uuid/v4');
const { sitemapProducer } = require('../../scan/producers');

const { transport, emailTemplate } = require('../mail');
const { getUserTokenFromId } = require('../user');
const {
  EMAIL_TAKEN,
  EMAIL_NOT_FOUND,
  INCORRECT_PASSWORD,
  INVALID_HOSTNAME,
  SIGN_IN_REQUIRED,
  SITE_ALREADY_ADDED,
  SITE_NOT_FOUND,
  NO_USER_FOUND,
  NEW_PASSWORD_REQUIRED,
} = require('../errors.js');

const Mutation = {
  async signUp(parent, { input }, context) {
    const {
      email, password, firstName, lastName,
    } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await context.db.users
      .create({
        data: {
          email: email.toLowerCase(),
          firstName,
          lastName,
          password: hashedPassword,
          plan: {
            connect: {
              level: 0,
            },
          },
        },
      })
      .catch((err) => {
        console.log(err);
        throw new Error(EMAIL_TAKEN);
      });

    const token = getUserTokenFromId(user.id);
    context.res.cookie('token', token, {
      httpOnly: true,
    });

    return user;
  },

  async signIn(parent, { input }, { db, res }) {
    const email = input.email.toLowerCase();

    const user = await db.users
      .findOne({
        where: {
          email,
        },
      })
      .catch(() => {
        throw new Error(EMAIL_NOT_FOUND);
      });

    const passValid = await bcrypt.compare(input.password, user.password);
    if (!passValid) {
      throw new Error(INCORRECT_PASSWORD);
    }
    const token = getUserTokenFromId(user.id);
    res.cookie('token', token, {
      httpOnly: true,
    });

    return { token, user };
  },

  // Create UserSite
  async addUserSite(
    parent,
    { input: { hostname, apiKey, minimumReview } },
    { user, db },
  ) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    // validate hostname
    const hostnameValidator = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g; // eslint-disable-line no-useless-escape
    const validHostname = hostnameValidator.test(hostname);

    if (!validHostname) {
      throw new Error(INVALID_HOSTNAME);
    }

    const site = await db.sites.upsert({
      where: { hostname },
      update: { hostname },
      create: { hostname },
    });

    const userSites = await db.userSites.findMany({
      where: {
        user: {
          id: user.userId,
        },
        site: {
          id: site.id,
        },
      },
    });

    if (userSites.length) {
      throw new Error(SITE_ALREADY_ADDED);
    } else {
      await db.userSites.create({
        data: {
          site: { connect: { id: site.id } },
          user: { connect: { id: user.userId } },
          associatesApiKey: apiKey,
          minimumReview,
          runningReport: false,
        },
      });
    }

    return { domain: { hostname } };
  },

  // Update UserSite
  async updateUserSite(
    parent,
    {
      input: {
        hostname, associatesApiKey, minimumReview, runningReport,
      },
    },
    { user, db },
  ) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    const userSites = await db.userSites.findMany({
      where: {
        user: {
          id: user.userId,
        },
        site: {
          hostname,
        },
      },
    });

    if (userSites.length) {
      userSites.map(async (userSite) => {
        await db.userSites.update({
          where: {
            id: userSite.id,
          },
          data: {
            associatesApiKey,
            minimumReview,
            runningReport,
          },
        });
      });
    }

    return { domain: { hostname } };
  },

  async deleteUserSite(parent, { input: { hostname } }, { user, db }) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    // Find the Site with the given hostname
    const site = await db.sites
      .findOne({
        where: { hostname },
      })
      .catch(() => {
        throw new Error(SITE_NOT_FOUND);
      });

    // Find and delete the UserSite with the given ID
    await db.userSites.deleteMany({
      where: {
        user: {
          id: user.userId,
        },
        site: {
          id: site.id,
        },
      },
    });

    return { message: 'Successfully deleted hostname' };
  },

  signOut(parent, args, context) {
    context.res.clearCookie('token');
    return { message: 'Successfully logged out 🔑' };
  },

  async requestReset(parent, { input }, context) {
    const email = input.email.toLowerCase();

    // Check to see if the user exists
    const user = await context.db.users
      .findOne({ where: { email } })
      .catch(() => {
        throw new Error(NO_USER_FOUND);
      });

    // Create a reset token and expiry
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update the user with the token and expiry
    await context.db.users.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    await transport.sendMail({
      from: 'support@anchorfloat.com',
      to: user.email,
      subject: 'Reset Your Password',
      html: emailTemplate(
        `Your password reset token is here.
          \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
            Click here</a> to reset your password.`,
      ),
    });

    // Return the message
    return { message: 'Please check your email for a reset link' };
  },

  async resetPassword(parent, { input }, context) {
    const { resetToken, password, confirmPassword } = input;
    // Check if the passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if reset token is legitimate
    // Check if reset token is expired
    const [user] = await context.db.users.findMany({
      where: {
        resetToken,
        resetTokenExpiry: { gte: Date.now() - 3600000 },
      },
    });

    if (!user) {
      throw new Error('That token is no longer valid 😦');
    }

    // Hash new password
    const newPassword = await bcrypt.hash(password, 10);

    // Save the new password to the user and remove old resetToken fields
    const updatedUser = await context.db.users.update({
      where: { email: user.email },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // Generate JWT
    const token = getUserTokenFromId(updatedUser.id);

    // Set the JWT cookie
    context.res.cookie('token', token, {
      httpOnly: true,
    });

    // Return the new user
    return updatedUser;
  },

  async updateUserPlan(parent, { input }, { user, db }) {
    const { level } = input;
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    await db.users.update({
      where: { id: user.userId },
      data: {
        plan: { connect: { level } },
      },
    });
    return { level };
  },

  async updateUserPassword(parent, { input }, { user, db }) {
    const { currentPassword, newPassword } = input;
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }
    if (!newPassword) {
      throw new Error(NEW_PASSWORD_REQUIRED);
    }
    if (!currentPassword) {
      throw new Error('Please enter a new password');
    }

    if (newPassword === currentPassword) {
      throw new Error('Your new password is the same as your old one.');
    }

    const dbUser = await db.users
      .findOne({
        where: {
          id: user.userId,
        },
      })
      .catch(() => {
        throw new Error(EMAIL_NOT_FOUND);
      });

    // const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);
    const passValid = await bcrypt.compare(currentPassword, dbUser.password);
    if (!passValid) {
      throw new Error(INCORRECT_PASSWORD);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.users.update({
      where: { id: dbUser.id },
      data: { password: hashedPassword },
    });

    return { message: 'Updated password' };
  },

  async createStripeSession(parent, { input }, { user, db }) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    const dbUser = await db.users
      .findOne({
        where: {
          id: user.userId,
        },
      })
      .catch((err) => {
        throw new Error('Unknown database error');
      });

    if (!dbUser) {
      throw new Error(EMAIL_NOT_FOUND);
    }

    if (dbUser.stripeCustomerId) {
      throw new Error('A subscription for this account already exists');
    }

    const { stripePlanId } = input;
    let stripeSession;

    // Create a new subscription
    try {
      stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        subscription_data: {
          items: [
            {
              plan: stripePlanId,
            },
          ],
        },
        success_url:
          'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
        client_reference_id: user.userId,
        customer_email: dbUser.email,
      });
    } catch (err) {
      console.log(err);
      throw new Error('There was an error creating a checkout session');
    }
    return { stripeSessionId: stripeSession.id };
  },
  async updateStripeSubscription(parent, { input }, { user, db }) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    const { userId } = user;

    const dbUser = await db.users
      .findOne({
        where: {
          id: userId,
        },
      })
      .catch(() => {
        throw new Error('Unknown database error');
      });

    if (!dbUser) {
      throw new Error(EMAIL_NOT_FOUND);
    }

    if (!dbUser.stripeCustomerId) {
      throw new Error('An existing subscription was not found');
    }

    const { stripePlanId } = input;

    // Get the subscription item ID
    const subscriptionList = await stripe.subscriptions.list({
      customer: dbUser.stripeCustomerId,
    });

    if (!subscriptionList) {
      throw new Error('Error encountered with payment processor');
    }

    const subscriptionItemId = subscriptionList.data[0].items.data[0].id;

    const res = await stripe.subscriptions.update(dbUser.stripeSubscriptionId, {
      prorate: false,
      items: [{ id: subscriptionItemId, plan: stripePlanId }],
    });

    return { message: `Changed to the ${res.plan.nickname} plan` };
  },

  async runSiteReport(parent, args, { user, db }) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    const { userId } = user;

    const dbUser = await db.users
      .findOne({
        where: { id: userId },
      })
      .catch(() => {
        throw new Error('There was an issue finding your account details');
      });


    const accountCredits = dbUser.creditsRemaining;

    if (!(accountCredits > 0)) {
      throw new Error("You don't have enough credits to generate this report");
    }

    sitemapProducer.send(
      [
        {
          id: uuid(),
          body: JSON.stringify({
            userId,
            url: 'https://www.aroundthebats.com/sitemap_index.xml',
          }),
        },
      ],
      (err) => {
        if (err) console.log(err);
      },
    );

    await db.users.update({
      where: {
        id: userId,
      },
      data: {
        creditsRemaining: accountCredits - 1,
      },
    });
  },
};

module.exports = Mutation;
