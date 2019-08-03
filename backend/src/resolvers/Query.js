const Query = {
  me(parent, args, context, info) {
    const { user } = context.req;
    if (!user) {
      return null;
    }
    return context.db.users.findOne(
      {
        where: { id: user.id },
      },
      info,
    );
  },
  users(parent, args, context, info) {
    return context.db.users.findMany();
  },
};

module.exports = Query;
