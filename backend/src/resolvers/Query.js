const Query = {
  me(parent, args, { user, db }, info) {
    if (!user) {
      return null;
    }
    return db.users.findOne(
      {
        where: { id: user.userId },
      },
      info,
    );
  },
  users(parent, args, context, info) {
    return context.db.users.findMany();
  },
};

module.exports = Query;
