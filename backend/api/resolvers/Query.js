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

  async userSites(parent, args, { user, db }, info) {
    if (!user) {
      throw new Error('You must be signed in');
    }
    const userSites = await db.userSites.findMany({
      where: { user: { id: user.userId } },
      select: { site: true },
    });

    const sites = userSites.map(userSite => userSite.site);
    console.log(...sites);
    return { sites };
  },
};

module.exports = Query;
