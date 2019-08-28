const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

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
          email,
          firstName,
          lastName,
          password: hashedPassword,
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
      .catch((err) => {
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
    {
      input: {
        hostname, apiKey, scanFreq, minimumReview,
      },
    },
    { user, db },
    info,
  ) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    // validate hostname
    const hostnameValidator = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
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
          scanFreq,
          minimumReview,
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
        hostname, associatesApiKey, scanFreq, minimumReview,
      },
    },
    { user, db },
    info,
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
            scanFreq,
            minimumReview,
          },
        });
      });
    }

    return { domain: { hostname } };
  },

  async deleteUserSite(
    parent,
    {
      input: { hostname },
    },
    { user, db },
    info,
  ) {
    if (!user) {
      throw new Error(SIGN_IN_REQUIRED);
    }

    // Find the Site with the given hostname
    const site = await db.sites
      .findOne({
        where: { hostname },
      })
      .catch((err) => {
        throw new Error(SITE_NOT_FOUND);
      });

    // Find and delete the UserSite with the given ID
    const res = await db.userSites.deleteMany({
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

  signOut(parent, args, context, info) {
    context.res.clearCookie('token');
    return { message: 'Successfully logged out 🔑' };
  },

  async requestReset(parent, { input }, context, info) {
    const { email } = input;

    // Check to see if the user exists
    const user = await context.db.users.findOne({ where: { email } }).catch((err) => {
      throw new Error(NO_USER_FOUND);
    });

    // Create a reset token and expiry
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Update the user with the token and expiry
    const res = await context.db.users.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // TODO: Email them the reset token
    const mailRes = await transport.sendMail({
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

  async resetPassword(parent, { input }, context, info) {
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

    const dbUser = await db.users
      .findOne({
        where: {
          id: user.userId,
        },
      })
      .catch((err) => {
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
};

module.exports = Mutation;
