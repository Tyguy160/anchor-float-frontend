const Mutations = {
  async createUser(parent, args, context, info) {
    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
        },
      },
      info
    );
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
