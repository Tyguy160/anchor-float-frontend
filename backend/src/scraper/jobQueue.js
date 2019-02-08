const Queue = require('bull');
const path = require('path');

const parseConfig = {
  limiter: {
    // Number of processes allowed
    max: 1,
    // Per TIME period
    duration: 15000, // 15 seconds
  },
};

const shortlinkParseQueue = new Queue('shortlink-parsing', parseConfig);
shortlinkParseQueue.process(
  path.join(__dirname, './shortlinkParseProcessor.js')
);

const pageParseQueue = new Queue('page-parsing');
pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));

const productParseQueue = new Queue('product-parsing', parseConfig);
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

const sitemapParseQueue = new Queue('sitemap-parsing', parseConfig);
sitemapParseQueue.process(path.join(__dirname, './sitemapParseProcessor.js'));

module.exports = {
  pageParseQueue,
  productParseQueue,
  shortlinkParseQueue,
  sitemapParseQueue,
};
