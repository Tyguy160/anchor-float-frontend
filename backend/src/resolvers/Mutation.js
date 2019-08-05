const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
  // Sign-up mutation
  async signUp(parent, { input }, context, info) {
    // Take the user provided email and password, then hash the password
    const { email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Try to create a new user
    try {
      const user = await context.db.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: '30d', // token will expire in 30days
      });
      context.res.cookie('token', token, {
        httpOnly: true,
      });

      return user;
    } catch (err) {
      console.log(err);
      throw new Error('We were unable to create your account. Try another email.');
    }
  },

  // Sign-in mutation
  async signIn(parent, { input }, context, info) {
    const email = input.email.toLowerCase();

    // Try to find the user with the email, then compare their hashed pass to the provided one
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
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: '30d', // token will expire in 30days
      });
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

    // get user but with domains
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
};

module.exports = Mutation;
