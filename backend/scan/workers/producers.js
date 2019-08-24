const Producer = require('sqs-producer');

const productProducer = Producer.create({
  queueUrl: process.env.PARSE_PRODUCT_QUEUE_URL,
  region: process.env.AWS_REGION,
});

const pageProducer = Producer.create({
  queueUrl: process.env.PARSE_PAGE_QUEUE_URL,
  region: process.env.AWS_REGION,
});

module.exports = { productProducer, pageProducer };
