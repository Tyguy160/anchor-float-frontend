const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, emailTemplate } = require('../mail');
const { getUserTokenFromId } = require('../user');

const Mutation = {
  // Done
  async signUp(parent, { input }, context) {
    const { email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await context.db.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = getUserTokenFromId(user.id);
      context.res.cookie('token', token, {
        httpOnly: true,
      });

      return user;
    } catch (err) {
      throw new Error('We were unable to create your account. Try another email.');
    }
  },

  // Done
  async signIn(parent, { input }, context) {
    const email = input.email.toLowerCase();

    try {
      const user = await context.db.users.findOne({
        where: {
          email,
        },
      });
      const passValid = await bcrypt.compare(input.password, user.password);
      if (!passValid) {
        throw new Error('Incorrect password');
      }
      const token = getUserTokenFromId(user.id);
      context.res.cookie('token', token, {
        httpOnly: true,
      });

      return { token, user };
    } catch (err) {
      throw new Error(`No user found for ${input.email}`);
    }
  },

  // Create UserSite
  async addUserSite(
    parent,
    {
      input: { hostname, apiKey, scanFreq },
    },
    { user, db },
    info,
  ) {
    if (!user) {
      throw new Error('You must be signed in');
    }

    // validate hostname
    const hostnameValidator = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/g;
    const validHostname = hostnameValidator.test(hostname);

    if (!validHostname) {
      throw new Error('Not a valid hostname');
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
      throw new Error('That site has already been added to your account');
    } else {
      await db.userSites.create({
        data: {
          site: { connect: { id: site.id } },
          user: { connect: { id: user.userId } },
          associatesApiKey: apiKey,
          scanFreq,
        },
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
      throw new Error('You must be signed in');
    }

    // Find the Site with the given hostname
    const site = await db.sites.findOne({
      where: { hostname },
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
    try {
      // Check to see if the user exists
      const user = await context.db.users.findOne({ where: { email } });

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
    } catch (err) {
      return { message: 'There was an error. Please try again.' };
    }
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
      console.log('this token is either invalid or expired');
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
      throw new Error('You must be signed in');
    }

    await db.users.update({
      where: { id: user.userId },
      data: {
        plan: { connect: { level } },
      },
    });
    return { level };
  },
};

module.exports = Mutation;
