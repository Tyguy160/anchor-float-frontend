const Queue = require('bull');
const path = require('path');

const pageParseQueue = new Queue('page-parsing');
const productParseQueue = new Queue('product-parsing');

pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));
productParseQueue.process(path.join(__dirname, './productParseProcessor.js'));

module.exports = { pageParseQueue, productParseQueue };
