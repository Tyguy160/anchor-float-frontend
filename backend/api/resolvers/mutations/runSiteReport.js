const uuid = require('uuid/v4');

const { sitemapProducer } = require('../../../scan/producers');
const { SIGN_IN_REQUIRED } = require('../../errors');

async function runSiteReport(parent, { input: { hostname } }, { user, db }) {
  if (!user) {
    throw new Error(SIGN_IN_REQUIRED);
  }

  const { userId } = user;

  const dbUser = await db.users
    .findOne({
      where: { id: userId },
    })
    .catch(() => {
      throw new Error('There was an issue finding your account details');
    });

  // Get the site so we can get the sitemap URL
  const site = await db.sites.findOne({
    where: { hostname },
  });

  const accountCredits = dbUser.creditsRemaining;

  if (!(accountCredits > 0)) {
    throw new Error("You don't have enough credits to generate this report");
  }

  sitemapProducer.send(
    [
      {
        id: uuid(),
        body: JSON.stringify({
          userId,
          url: site.sitemapUrl,
        }),
      },
    ],
    err => {
      if (err) console.log(err);
    }
  );

  // TODO: Only update the credits after the report has been stored
  await db.users.update({
    where: {
      id: userId,
    },
    data: {
      creditsRemaining: accountCredits - 1,
    },
  });
}

module.exports = { runSiteReport };
