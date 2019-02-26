const Queue = require('bull');
const path = require('path');

const redisConfig = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_ENDPOINT,
  password: process.env.REDIS_PASSWORD,
};

const sitemapParseConfig = {
  redis: redisConfig,
  limiter: {
    // Number of processes allowed
    max: 1,
    // Per TIME period
    duration: 15000, // 15 seconds
  },
};

const shortParseConfig = {
  redis: redisConfig,
  limiter: {
    // Number of processes allowed
    max: 1,
    // Per TIME period
    duration: 4500,
  },
  defaultJobOptions: {
    // Jobs timeout and moved to failed after 4 seconds
    timeout: 4000,
  },
};

const shortlinkParseQueue = new Queue('shortlink-parsing', shortParseConfig);
shortlinkParseQueue.process(
  path.join(__dirname, './shortlinkParseProcessor.js')
);

const pageParseQueue = new Queue('page-parsing', shortParseConfig);
pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));

const productParseQueue = new Queue('product-parsing', shortParseConfig);
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

const sitemapsParseQueue = new Queue('sitemap-parsing', sitemapParseConfig);
sitemapsParseQueue.process(path.join(__dirname, './sitemapsParseProcessor.js'));

module.exports = {
  pageParseQueue,
  productParseQueue,
  shortlinkParseQueue,
  sitemapsParseQueue,
};
