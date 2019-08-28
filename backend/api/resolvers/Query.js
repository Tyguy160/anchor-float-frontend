const Query = {
  async me(parent, args, { user, db, res }, info) {
    if (!user) {
      return null;
    }
    const dbUser = await db.users
      .findOne({
        where: { id: user.userId },
        include: { sites: true, plan: true },
      })
      .catch((err) => {
        res.clearCookie('token');
        throw new Error('There was an issue finding your account details');
      });
    return dbUser;
  },

  async userSites(parent, args, { user, db }, info) {
    if (!user) {
      throw new Error('You must be signed in');
    }
    const userSites = await db.userSites.findMany({
      where: { user: { id: user.userId } },
      select: {
        site: true,
        associatesApiKey: true,
        scanFreq: true,
        minimumReview: true,
      },
    });
    const sites = userSites.map(userSite => ({
      hostname: userSite.site.hostname,
      associatesApiKey: userSite.associatesApiKey,
      scanFreq: userSite.scanFreq,
      minimumReview: userSite.minimumReview,
    }));

    return [...sites];
  },
};

module.exports = Query;
