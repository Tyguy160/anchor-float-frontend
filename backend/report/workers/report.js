const axios = require('axios');
const { getDB } = require('../../prisma/db');
const { getData } = require('../getData');
const { getDataFromMessage, uploadFile } = require('./utils');

async function reportHandler({ Body, MessageId }) {
  const hostname = getDataFromMessage(Body, 'hostname');
  const userId = getDataFromMessage(Body, 'userId');
  const bucketName = 'anchor-float-report';
  try {
    console.log(`Creating a report for ${hostname}`);
    const csvPath = await getData(hostname);
    console.log(csvPath);
    await uploadFile(bucketName, csvPath);
  } catch (err) {
    console.log(err);
  }

  // generateCSV()
  // putCSVInCLOUDandAddRerport()

  // Worker
  //  Queries based on hostname
  //  Generates a CSV
  //  TODO: Upload CSV to cloud
  //  TODO: Create report object in DB with file URL
  //  return from function
}

module.exports = { reportHandler };
