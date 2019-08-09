const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

const { getUserTokenFromId } = require('../user');

const Mutation = {
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

  async addDomain(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }',
    );

    let { hostname } = args;
    hostname = hostname.toLowerCase();
    const userHasDomain = user.domains.map(entry => entry.hostname).includes(hostname);
    if (userHasDomain) {
      throw new Error(`You've alread added ${hostname}`);
    }

    let domain = await context.db.query.domain({
      where: { hostname },
    });
    if (!domain) {
      domain = await context.db.mutation.createDomain(
        {
          data: {
            ...args,
          },
        },
        info,
      );
      const domainPrefs = await context.db.mutation.createUserDomainPreferences(
        {
          data: {
            domain: { connect: { id: domain.id } },
            user: { connect: { id: user.id } },
          },
        },
        `{
          id
          domain {
            id
          }
          user {
            id
          }
        }`,
      );
      await context.db.mutation.updateDomain({
        where: { id: domain.id },
        data: { preferences: { connect: [{ id: domainPrefs.id }] } },
      });
    }
    await context.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        domains: {
          connect: [
            {
              id: domain.id,
            },
          ],
        },
      },
    });

    return domain;
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
      console.log(resetToken);
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

      // Update the user with the token and expiry
      const res = await context.db.users.update({
        where: { email },
        data: { resetToken, resetTokenExpiry },
      });

      // TODO: Email them the reset token
      return { message: 'Please check your email for a reset link' };
    } catch (err) {
      console.log(err);
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
    console.log(user);
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
};

module.exports = Mutation;
