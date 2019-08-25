require('dotenv').config();
const Producer = require('sqs-producer');

console.log(process.env);
const sitemapProducer = Producer.create({
  queueUrl: process.env.PARSE_SITEMAP_QUEUE_URL,
  // region: process.env.AWS_REGION,
});

const pageProducer = Producer.create({
  queueUrl: process.env.PARSE_PAGE_QUEUE_URL,
  // region: process.env.AWS_REGION,
});

module.exports = { sitemapProducer, pageProducer };
