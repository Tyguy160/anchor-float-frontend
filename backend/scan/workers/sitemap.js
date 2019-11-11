const Sitemapper = require('sitemapper');
const uuid = require('uuid/v4');
const { getDataFromMessage } = require('./utils');
const { pageProducer } = require('../producers');
const progress = require('../../manager/index');

async function parseSitemapHandler({ Body, MessageId }) {
  // Get the sitemap using the URL and queue up pages based on the sitemap
  // Could be recursive
  const userId = getDataFromMessage(Body, 'userId');
  const urlStr = getDataFromMessage(Body, 'url');
  if (!urlStr) return;

  let url;
  try {
    url = new URL(urlStr);
  } catch (err) {
    console.log(`Invalid url: ${urlStr}`);
    return;
  }

  progress.sitemapParseStarted({ jobId: MessageId, userId, hostname: url.hostname });

  const sitemap = new Sitemapper();
  const pageUrls = new Set();
  const { sites } = await sitemap.fetch(url.href);
  console.log(`Sitemap: ${url.href} has ${sites.length} pages`);
  sites.forEach(site => pageUrls.add(site));

  pageUrls.forEach((url) => {
    console.log(`Adding to page parse queue:\n${url}\n`);
    const id = uuid();
    pageProducer.send(
      [
        {
          id,
          body: JSON.stringify({ url, jobId: MessageId }),
        },
      ],
      (err) => {
        if (err) console.log(err);
      },
    );
    progress.pageParseAdded({ jobId: MessageId, taskId: id });
  });
}

module.exports = { parseSitemapHandler };
