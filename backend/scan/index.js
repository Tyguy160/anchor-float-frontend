require('dotenv').config();
const { Consumer } = require('sqs-consumer');
const { parseSitemapHandler } = require('./workers/sitemap');
const { parsePageHandler } = require('./workers/page');
const { parseShortlinkHandler } = require('./workers/shortlink');

const parseSitemapConsumer = Consumer.create({
  queueUrl: process.env.PARSE_SITEMAP_QUEUE_URL,
  handleMessage: parseSitemapHandler,
});

const parsePageConsumer = Consumer.create({
  queueUrl: process.env.PARSE_PAGE_QUEUE_URL,
  handleMessage: parsePageHandler,
});

const parseShortlinkConsumer = Consumer.create({
  queueUrl: process.env.PARSE_SHORTLINK_QUEUE_URL,
  handleMessage: parseShortlinkHandler,
});

parseSitemapConsumer.start();
console.log('Parse sitemap consumer running...');
parsePageConsumer.start();
console.log('Parse page consumer running...');
// parseShortlinkConsumer.start();
// console.log('Parse shortlink consumer running...');
