require('dotenv').config();
const uuid = require('uuid/v4');
const { sitemapProducer } = require('./producers.js');

const userInputUrl = process.argv.slice(2, 3)[0];

// const userInputUrl = `https://${sitemapUrl}`;

console.log(`Adding sitemap URL: ${userInputUrl}`);

sitemapProducer.send(
  [
    {
      id: uuid(),
      body: JSON.stringify({ url: userInputUrl }),
    },
  ],
  (err) => {
    if (err) console.log(err);
  },
);
