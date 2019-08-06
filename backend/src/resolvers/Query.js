const Query = {
  me(parent, args, { user, db }, info) {
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
};

module.exports = Query;
