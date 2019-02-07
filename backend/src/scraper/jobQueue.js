const Queue = require('bull');
const path = require('path');

const TIME = 15000; // 15 seconds

const pageParseQueue = new Queue('page-parsing');
const productParseQueue = new Queue('product-parsing', {
  limiter: {
    max: 1,
    duration: TIME,
  },
});

pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

module.exports = { pageParseQueue, productParseQueue };
