const Queue = require('bull');
const path = require('path');

const WORKERS = 1;
const TIME = 15000; // 15 seconds
const amazonParseConfig = {
  limiter: {
    // Number of processes allowed
    max: WORKERS,
    // Per TIME period
    duration: TIME,
  },
};
const shortlinkParseQueue = new Queue('shortlink-parsing', amazonParseConfig);
shortlinkParseQueue.process(
  path.join(__dirname, './shortlinkParseProcessor.js')
);

const pageParseQueue = new Queue('page-parsing');
pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));

const productParseQueue = new Queue('product-parsing', amazonParseConfig);
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

module.exports = { pageParseQueue, productParseQueue, shortlinkParseQueue };
