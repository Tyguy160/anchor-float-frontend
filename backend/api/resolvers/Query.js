const Query = {
  async me(parent, args, { user, db, res }) {
    if (!user) {
      return null;
    }
    const dbUser = await db.users
      .findOne({
        where: { id: user.userId },
        include: { sites: true, plan: true },
      })
      .catch(() => {
        res.clearCookie('token');
        throw new Error('There was an issue finding your account details');
      });
    console.log(dbUser);
    return dbUser;
  },

  async userSites(parent, args, { user, db }) {
    if (!user) {
      throw new Error('You must be signed in');
    }
    const userSites = await db.userSites.findMany({
      where: { user: { id: user.userId } },
      select: {
        site: true,
        associatesApiKey: true,
        minimumReview: true,
      },
    });
    const sites = userSites.map(userSite => ({
      hostname: userSite.site.hostname,
      associatesApiKey: userSite.associatesApiKey,
      minimumReview: userSite.minimumReview,
    }));
    return [...sites];
  },
  async sitePages(parent, { input }, { db }) {
    const sitePages = await db.sites
      .findOne({
        where: {
          hostname: input.hostname,
        },
        include: {
          pages: true,
        },
      })
      .catch(console.log);
    return { site: sitePages };
  },
  async siteReports(parent, { input }, { db }) {
    return { reports: [{ hostname: 'www.flylingual.com', reportUrl: 'www.google.com', reportDate: Date.now() }, { hostname: 'www.flylingual.com', reportUrl: 'www.youtube.com', reportDate: Date.now() }] };
  },
};

module.exports = Query;
