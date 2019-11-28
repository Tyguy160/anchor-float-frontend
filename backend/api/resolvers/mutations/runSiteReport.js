const uuid = require('uuid/v4');

const { sitemapProducer } = require('../../../scan/producers');
const { SIGN_IN_REQUIRED } = require('../../errors');

async function runSiteReport(parent, args, { user, db }) {
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
          url: 'https://www.aroundthebats.com/sitemap_index.xml', // TODO: get the sitemap url on Site
        }),
      },
    ],
    (err) => {
      if (err) console.log(err);
    },
  );

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
