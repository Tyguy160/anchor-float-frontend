const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
  async signUp(parent, { input }, { db }, info) {
    const { email, password } = input;
    return db.users.create(
      {
        data: {
          email,
          password,
        },
      },
      info,
    );

    // let user = await context.db.query.user({
    //   where: {
    //     email,
    //   },
    // });
    // if (user) {
    //   throw new Error('An account with that email already exists');
    // }
    // const password = await bcrypt.hash(args.password, 10);
    // user = await context.db.mutation.createUser(
    //   {
    //     data: {
    //       ...args,
    //       password,
    //     },
    //   },
    //   info,
    // );
    // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // context.response.cookie('token', token, {
    //   httpOnly: true,
    //   maxAge: ONE_YEAR,
    // });
  },

  async signIn(parent, { input }, context, info) {
    const email = args.email.toLowerCase();
    const user = await context.db.query.user({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error(`No user found for ${args.email}`);
    }
    const passValid = await bcrypt.compare(args.password, user.password);
    if (!passValid) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });
    return user;
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
