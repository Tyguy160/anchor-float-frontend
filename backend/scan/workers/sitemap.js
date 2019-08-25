const Sitemapper = require('sitemapper');
const uuid = require('uuid/v4');
const { getDataFromMessage } = require('./utils');
const { pageProducer } = require('../producers.js');

async function parseSitemapHandler({ Body, MessageId }) {
  // Get the sitemap using the URL and queue up pages based on the sitemap
  // Could be recursive
  const urlStr = getDataFromMessage(Body, 'url');
  if (!urlStr) return;

  let url;
  try {
    url = new URL(urlStr);
  } catch (err) {
    console.log(`Invalid url: ${urlStr}`);
    return;
  }

  const sitemap = new Sitemapper();
  const pageUrls = new Set();
  const { sites } = await sitemap.fetch(url.href);
  sites.forEach(site => pageUrls.add(site));

  // console.log(pageUrls);
  pageUrls.forEach((url) => {
    console.log(`Adding to page parse queue:\n${url}\n`);
    pageProducer.send(
      [
        {
          id: uuid(),
          body: JSON.stringify({ url }),
        },
      ],
      (err) => {
        if (err) console.log(err);
      },
    );
  });
}

module.exports = { parseSitemapHandler };
