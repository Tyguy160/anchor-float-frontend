const Queue = require('bull');
const path = require('path');

const pageParseQueue = new Queue('page-parsing');

pageParseQueue.process(path.join(__dirname, './pageParseProcessor.js'));

module.exports.pageParseQueue = pageParseQueue;
