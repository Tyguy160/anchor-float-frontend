const Query = {
  me(parent, args, context, info) {
    const { user } = context.request;
    if (!user) {
      return null;
    }
    return context.db.query.user(
      {
        where: { id: user.id },
      },
      info,
    );
  },
};

module.exports = Query;
