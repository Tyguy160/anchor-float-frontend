require('dotenv').config();
const uuid = require('uuid/v4');
const { reportProducer } = require('./producers.js');

const hostnameInput = process.argv.slice(2, 3)[0];

// const userInputUrl = `https://${sitemapUrl}`;

console.log(`Generating a report for: ${hostnameInput}`);

reportProducer.send(
  [
    {
      id: uuid(),
      body: JSON.stringify({ hostname: hostnameInput }),
    },
  ],
  (err) => {
    if (err) console.log(err);
  },
);
