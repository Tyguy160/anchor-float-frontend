const axios = require('axios');
const { getDB } = require('../../prisma/db');
const { getData } = require('../getData');
const { getDataFromMessage } = require('./utils');

async function reportHandler({ Body, MessageId }) {
  const hostname = getDataFromMessage(Body, 'hostname');

  try {
    console.log(`Creating a report for ${hostname}`);
    const siteData = await getData(hostname);
    console.log(siteData);
  } catch (err) {
    console.log(`Invalid hostname: ${hostname}`);
  }

  return hostname;
}

module.exports = { reportHandler };
