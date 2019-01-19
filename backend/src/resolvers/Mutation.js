const Mutations = {
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
};

module.exports = Mutations;
