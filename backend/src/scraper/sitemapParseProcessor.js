const Sitemapper = require('sitemapper');
const { pageParseQueue } = require('./jobQueue');
const db = require('../db');

async function sitemapParseProcessor(job) {
  try {
    const { sitemapUrl, contentSelector } = job.data;

    if (!sitemapUrl.endsWith('.xml')) {
      throw new Error('Sitemap URL must end in `.xml`');
    }

    const sitemap = new Sitemapper();
    const { sites } = await sitemap.fetch(sitemapUrl);

    for (pageHref of sites) {
      const page = await db.query.page(
        { where: { url: pageHref } },
        `{ id, url }`
      );
      if (!page) {
        await createPageAndConnect(pageHref, contentSelector);
      } else {
        console.log(`Page already exists in DB\n${pageHref}\n`);
        pageParseQueue.add({
          url: page.url,
          pageId: page.id,
          contentSelector,
        });
      }
    }

    return Promise.resolve(sites);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

async function createPageAndConnect(pageUrl, contentSelector) {
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
    contentSelector,
  });
}

module.exports = sitemapParseProcessor;
