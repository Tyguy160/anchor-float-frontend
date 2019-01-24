const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async signup(parent, args, context, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);

    // Delete the unencrypted pass to prevent passing unintentionally
    delete args.password;

    // create the user in the database
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );

    // Create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // Set the jwt as a cookie on the response
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Return the user to the browser
    return user;
  },

  async deleteUser(parent, args, context, info) {
    const user = await context.db.mutation.deleteUser(
      {
        where: {
          ...args,
        },
      },
      info
    );
    return user;
  },

  async createDomain(parent, args, context, info) {
    const domain = await context.db.mutation.createDomain(
      {
        data: {
          ...args,
        },
      },
      info
    );
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

module.exports = Mutations;
