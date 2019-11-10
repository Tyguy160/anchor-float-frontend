const EventEmitter = require('events');
const redis = require('redis');

const redisClient = redis.createClient();
redisClient.on('connect', () => {
  console.log('connected to Redis');
});

// Event name
const SITEMAP_PARSE_STARTED = 'sitemapParseStarted';
const SITEMAP_PARSE_COMPLETED = 'sitemapParseCompleted';

const PAGE_PARSE_ADDED = 'pageParseAdded';
const PAGE_PARSE_COMPLETED = 'pageParseCompleted';

const PRODUCT_FETCH_ADDED = 'productFetchAdded';
const PRODUCT_FETCH_COMPLETED = 'productFetchCompleted';

// Redis constants
const JOBS_COMPLETED_SET = 'jobs-completed';
const JOBS_ALL_SET = 'jobs-all';

class ProgressManager extends EventEmitter {
  sitemapParseStarted(jobInfo) {
    this.emit(SITEMAP_PARSE_STARTED, jobInfo);
  }
}

const progMan = new ProgressManager();

// Noun - Verb - Stage i.e. sitemapParseStarted

// Sitemap
progMan.on(SITEMAP_PARSE_STARTED, ({ taskId, userId, sitemapUrl }) => {
  console.log(`Started: ${taskId}`);
  redisClient.sadd(JOBS_ALL_SET, taskId);
});

progMan.on(SITEMAP_PARSE_COMPLETED, ({ taskId }) => {
});

progMan.on(PAGE_PARSE_ADDED, ({ taskId, pageUrl }) => {
});

// Page
progMan.on(PAGE_PARSE_COMPLETED, ({ taskId }) => {
});

progMan.on(PRODUCT_FETCH_ADDED, ({ taskId, asin, linkId }) => {
});

// Product
progMan.on(PRODUCT_FETCH_COMPLETED, ({ taskId }) => {
});

module.exports = progMan;
