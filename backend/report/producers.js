require('dotenv').config();
const Producer = require('sqs-producer');

const reportProducer = Producer.create({
  queueUrl: process.env.PARSE_PAGE_QUEUE_URL,
  region: process.env.AWS_REGION,
});

module.exports = { reportProducer };
