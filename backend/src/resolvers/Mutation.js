const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const { hostname } = args;
    if (!user) {
      throw new Error('You must be signed in');
    }
    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }'
    );
    const userHasDomain = user.domains
      .map(entry => entry.hostname.toLowerCase())
      .includes(hostname.toLowerCase());
    if (userHasDomain) {
      throw new Error('Domain already exists');
    }
    const domain = await context.db.mutation.createDomain(
      {
        data: {
          ...args,
        },
      },
      info
    );
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

  async deleteDomain(parent, args, context, info) {
    const domain = await context.db.mutation.deleteDomain(
      {
        where: {
          ...args,
        },
      },
      info
    );
    return domain;
  },

  async createPage(parent, args, context, info) {
    const page = await context.db.mutation.createPage(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return page;
  },

  async deletePage(parent, args, context, info) {
    const page = await context.db.mutation.deletePage(
      {
        where: {
          ...args,
        },
      },
      info
    );
    return page;
  },

  async createLink(parent, args, context, info) {
    const link = await context.db.mutation.createLink(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return link;
  },

  async deleteLink(parent, args, context, info) {
    const link = await context.db.mutation.deleteLink(
      {
        where: {
          ...args,
        },
      },
      info
    );
    return link;
  },

  async createProduct(parent, args, context, info) {
    const product = await context.db.mutation.createProduct(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return product;
  },

  async deleteProduct(parent, args, context, info) {
    const product = await context.db.mutation.deleteProduct(
      {
        where: {
          ...args,
        },
      },
      info
    );
    return product;
  },
};

module.exports = Mutation;
