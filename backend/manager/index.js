require('dotenv').config();

const EventEmitter = require('events');
const redis = require('redis');

const uuid = require('uuid/v4');
const { reportProducer } = require('../report/producers');

// Will likely need some config later
const redisClient = redis.createClient({
  host: 'redis',
  retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});
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

const FULL_SITE_COMPLETED = 'fullSiteCompleted';

class ProgressManager extends EventEmitter {
  sitemapParseStarted(eventInfo) {
    this.emit(SITEMAP_PARSE_STARTED, eventInfo);
  }

  sitemapParseCompleted(eventInfo) {
    this.emit(SITEMAP_PARSE_COMPLETED, eventInfo);
  }

  pageParseAdded(eventInfo) {
    this.emit(PAGE_PARSE_ADDED, eventInfo);
  }

  pageParseCompleted(eventInfo) {
    this.emit(PAGE_PARSE_COMPLETED, eventInfo);
  }

  productFetchAdded(eventInfo) {
    this.emit(PRODUCT_FETCH_ADDED, eventInfo);
  }

  productFetchCompleted(eventInfo) {
    this.emit(PRODUCT_FETCH_COMPLETED, eventInfo);
  }
}

const progMan = new ProgressManager();

// To trigger report generation
progMan.on(FULL_SITE_COMPLETED, ({ jobId }) => {
  const metaKey = `${jobId}:meta`;
  redisClient.hgetall(metaKey, (err, metaInfo) => {
    const { userId, hostname } = metaInfo;
    console.log(`Site complete.\nAdding report generation job for: ${hostname}\nUser: ${userId}\n`);

    reportProducer.send(
      [
        {
          id: uuid(),
          body: JSON.stringify({ userId, hostname }),
        },
      ],
    );
  });
});

// Sitemap
progMan.on(SITEMAP_PARSE_STARTED, ({ jobId, userId, hostname }) => {
  if (!userId) {
    console.log('No userId on sitemap job. No progress tracking');
    return;
  }

  console.log(`Sitemap starting for jobId: ${jobId}\nuserId: ${userId}\nhostname: ${hostname}\n`);

  const metaKey = `${jobId}:meta`;
  redisClient.hmset(metaKey, { // Set to nothing completed
    userId,
    hostname,
    sitemapComplete: 0,
    pagesComplete: 0,
    productsComplete: 0,
  });
});

progMan.on(SITEMAP_PARSE_COMPLETED, ({ jobId }) => {
  console.log(`Sitemap parse completed for jobId: ${jobId}\n`);

  const metaKey = `${jobId}:meta`;
  redisClient.hlen(metaKey, (err, length) => { // Make sure job is being tracked
    if (length > 0) {
      console.log(`Sitemap complete: ${jobId}`);
      redisClient.hmset(metaKey, {
        sitemapComplete: 1,
      });
    }
  });
});

progMan.on(PAGE_PARSE_ADDED, ({ jobId, taskId }) => {
  console.log(`Page parse added: ${jobId}\ntaskId: ${taskId}\n`);

  const pagesKey = `${jobId}:pages`;
  redisClient.sadd(pagesKey, taskId);
});

// Page
progMan.on(PAGE_PARSE_COMPLETED, ({ jobId, taskId }) => {
  const pagesKey = `${jobId}:pages`;

  console.log(`Page parse completed: ${jobId}\ntaskId: ${taskId}\n`);

  redisClient.srem(pagesKey, taskId);

  redisClient.scard(pagesKey, (err, pagesRemainingCount) => {
    if (pagesRemainingCount === 0) {
      const metaKey = `${jobId}:meta`;

      redisClient.hget(metaKey, 'sitemapComplete', (err, isComplete) => {
        if (isComplete) {
          console.log(`Page parsing complete: ${jobId}`);
          redisClient.hmset(metaKey, {
            pagesComplete: 1,
          });
        }
      });
    }
  });
});

progMan.on(PRODUCT_FETCH_ADDED, ({ jobId, taskId }) => {
  console.log(`Product fetch added: ${jobId}\ntaskId: ${taskId}\n`);
  const productsKey = `${jobId}:products`;
  redisClient.sadd(productsKey, taskId);
});

// Product
progMan.on(PRODUCT_FETCH_COMPLETED, ({ jobId, taskId }) => {
  console.log(`Product fetch completed: ${jobId}\ntaskId: ${taskId}\n`);

  const productsKey = `${jobId}:products`;

  redisClient.srem(productsKey, taskId);

  redisClient.scard(productsKey, (err, productsRemainingCount) => {
    if (productsRemainingCount === 0) {
      const metaKey = `${jobId}:meta`;

      redisClient.hget(metaKey, 'pagesComplete', (errFromHget, isComplete) => {
        if (isComplete) {
          redisClient.hmset(metaKey, {
            productsComplete: 1,
          });

          console.log(`FULL SITE COMPLETE: ${jobId}`);
          progMan.emit(FULL_SITE_COMPLETED, { jobId });
        }
      });
    }
  });
});

module.exports = progMan;
