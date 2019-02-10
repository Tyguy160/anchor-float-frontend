const Sitemapper = require('sitemapper');
const { pageParseQueue } = require('./jobQueue');
const db = require('../db');

async function sitemapParseProcessor(job) {
  try {
    const { domainId, sitemapUrl, contentSelector } = job.data;

    if (!sitemapUrl.endsWith('.xml')) {
      throw new Error('Sitemap URL must end in `.xml`');
    }

    const sitemap = new Sitemapper();
    const { sites } = await sitemap.fetch(sitemapUrl);

    for (pageHref of sites) {
      await createPageAndConnect(pageHref);
    }

    return Promise.resolve(sites);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

async function createPageAndConnect(pageUrl) {
  const { hostname, pathname } = new URL(pageUrl);
  console.log(
    `Making new page for... | ${new Date().toUTCString()}\n${pathname}\n`
  );
  const page = await db.mutation.createPage(
    {
      data: {
        url: pageUrl,
      },
    },
    `{ id }`
  );
  console.log(`Created page | ${new Date().toUTCString()}\n${page.id}\n`);

  const theDomain = await db.mutation.updateDomain(
    {
      where: { hostname },
      data: {
        pages: { connect: [{ id: page.id }] },
      },
    },
    `{ id }`
  );
  console.log(
    `Updated domain | ${new Date().toUTCString()}\n${theDomain.id}\n`
  );

  // pageParseQueue.add({
  //   url: pageUrl,
  //   pageId: page.id,
  //   contentSelector,
  // });
}

module.exports = sitemapParseProcessor;
