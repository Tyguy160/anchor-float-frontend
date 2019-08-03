const Query = {
  me(parent, args, { user, db }, info) {
    console.log(user);
    if (!user) {
      throw new Error('Not Authenticated');
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
