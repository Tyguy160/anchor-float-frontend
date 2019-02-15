const Sitemapper = require('sitemapper');
const { pageParseQueue } = require('./jobQueue');
const db = require('../db');

async function sitemapsParseProcessor(job) {
  if (!job.data || !job.data.domainHostname || !job.data.userId) {
    return Promise.resolve('Missing job data, domainHostname or userId.');
  }
  const { userId, domainHostname } = job.data;

  const [preferences] = await db.query.userDomainPreferenceses(
    {
      where: {
        AND: [
          { domain: { hostname: domainHostname } },
          { user: { id: userId } },
        ],
      },
    },
    `{ sitemapUrls }`
  );

  if (
    !preferences ||
    !preferences.sitemapUrls ||
    preferences.sitemapUrls.length === 0
  ) {
    return Promise.resolve('No sitemaps found. No action taken.');
  }

  const { sitemapUrls } = preferences;

  // TODO: Now that I have the array of sitemapUrls, I need to fetch each sitemap page
  // and pass each page url into a (currently) non-existant upsertPage function.

  const sitemap = new Sitemapper();
  const { sites } = await sitemap.fetch(sitemapUrl);

  for (pageHref of sites) {
    const page = await db.query.page(
      { where: { url: pageHref } },
      `{ id, url }`
    );
    if (!page) {
      await createPageAndConnect(pageHref);
    } else {
      console.log(`Page already exists in DB\n${pageHref}\n`);
      pageParseQueue.add({
        url: page.url,
        pageId: page.id,
      });
    }
  }

  return Promise.resolve(sites);
}

async function createPageAndConnect(pageUrl) {
  const { hostname, pathname } = new URL(pageUrl);
  console.log(
    `Creating new page and connecting to domain | ${new Date().toUTCString()}\n${pathname}\n`
  );
  const page = await db.mutation.createPage(
    {
      data: {
        url: pageUrl,
      },
    },
    `{ id }`
  );

  await db.mutation.updateDomain(
    {
      where: { hostname },
      data: {
        pages: { connect: [{ id: page.id }] },
      },
    },
    `{ id }`
  );

  pageParseQueue.add({
    url: pageUrl,
    pageId: page.id,
  });
}

module.exports = sitemapsParseProcessor;
