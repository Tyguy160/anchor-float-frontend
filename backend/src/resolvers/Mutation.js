const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { pageParseQueue } = require('../scraper/jobQueue');

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
  async signUp(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    let user = await context.db.query.user({
      where: {
        email: args.email,
      },
    });
    if (user) {
      throw new Error('An account with that email already exists');
    }
    const password = await bcrypt.hash(args.password, 10);
    delete args.password;
    user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });
    return user;
  },

  async signIn(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    const user = await context.db.query.user({
      where: {
        email: args.email,
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

  signOut(parent, args, context, info) {
    context.response.clearCookie('token');
    return { message: 'Signed out' };
  },

  async addDomain(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    // get user but with domains
    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }'
    );

    let { hostname } = args;
    hostname = hostname.toLowerCase();
    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);
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
        info
      );
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

  async addPage(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    // refetch user but with domains
    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }'
    );

    let { url, hostname } = args;
    url = new URL(url.toLowerCase());
    hostname = hostname.toLowerCase();

    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);

    if (!userHasDomain) {
      throw new Error(
        `"${hostname}" is not in your domains list. Please add it first.`
      );
    }

    if (url.hostname !== hostname) {
      throw new Error(
        `Domain: "${hostname}" and page: "${url.hostname}" do not match.`
      );
    }

    const urlToSave = url.origin + url.pathname;
    const page = await context.db.mutation.createPage(
      {
        data: {
          url: urlToSave,
        },
      },
      info
    );

    await context.db.mutation.updateDomain({
      where: { hostname },
      data: {
        pages: { connect: [{ id: page.id }] },
      },
    });

    pageParseQueue.add({
      url: urlToSave,
      pageId: page.id,
      origin: url.origin,
    });

    return page;
  },
};

module.exports = Mutation;
