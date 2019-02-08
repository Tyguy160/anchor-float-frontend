const Queue = require('bull');
const path = require('path');

const longParseConfig = {
  limiter: {
    // Number of processes allowed
    max: 1,
    // Per TIME period
    duration: 15000, // 15 seconds
  },
};

const shortParseConfig = {
  limiter: {
    // Number of processes allowed
    max: 1,
    // Per TIME period
    duration: 2000, // 1 second
  },
};

const shortlinkParseQueue = new Queue('shortlink-parsing', longParseConfig);
shortlinkParseQueue.process(
  path.join(__dirname, './shortlinkParseProcessor.js')
);

const pageParseQueue = new Queue('page-parsing', shortParseConfig);
pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));

const productParseQueue = new Queue('product-parsing', longParseConfig);
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

const sitemapParseQueue = new Queue('sitemap-parsing', shortParseConfig);
sitemapParseQueue.process(path.join(__dirname, './sitemapParseProcessor.js'));

module.exports = {
  pageParseQueue,
  productParseQueue,
  shortlinkParseQueue,
  sitemapParseQueue,
};
