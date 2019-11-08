const { Storage } = require('@google-cloud/storage');
const { Readable } = require('stream');
const { Transform } = require('json2csv');
const cryptoRandomString = require('crypto-random-string');
const { getData } = require('../getData');
const { getDataFromMessage, csvFields } = require('../utils');

// Cloud storage client
const storage = new Storage();
const reportBucket = storage.bucket(process.env.REPORT_BUCKET_NAME);

// CSV parser config
const csvOptions = { fields: csvFields, unwind: 'links' };
const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

const alphaNumeric = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const cryptoStringConfig = { length: 24, characters: alphaNumeric };

// Handler
async function reportHandler({ Body }) {
  const userId = getDataFromMessage(Body, 'userId');
  const hostname = getDataFromMessage(Body, 'hostname');

  if (!userId || !hostname) { // Required fields
    return;
  }

  const allPagesArray = await getData(hostname).catch(console.log);
  const allPagesJson = JSON.stringify(allPagesArray); // May use lots of memory

  const readableJsonStream = Readable();
  readableJsonStream.push(allPagesJson); // Add JSON string to the stream
  readableJsonStream.push(null); // Terminate stream

  const json2csv = new Transform(csvOptions, transformOpts);

  const reportObjName = cryptoRandomString(cryptoStringConfig); // TODO: check DB for existing
  const newReportFile = reportBucket.file(reportObjName);

  const ISODate = new Date().toISOString().split('T')[0]; // Current date e.g. "2019-11-07"
  const hostnameDashed = hostname.replace(/\./g, '-'); // e.g. "www-triplebar-com"
  const fullFileName = `${ISODate}-${hostnameDashed}-report.csv`; // "2019-11-07-www-triplebar-com-report.csv"

  const storageWriteStream = newReportFile.createWriteStream({
    gzip: true,
    metadata: {
      contentType: 'text/csv',
      contentLanguage: 'en',
      contentDisposition: `attachment; filename="${fullFileName}"`,
      cacheControl: 'private',
    },
  });

  readableJsonStream
    .pipe(json2csv) // convert JSON stream to CSV stream
    .pipe(storageWriteStream) // write CSV stream to storage bucket
    .on('error', (err) => {
      console.log('Error:\n');
      console.log(err);
    })
    .on('finish', () => {
      console.log(`Finished uploading report: https://storage.googleapis.com/anchor-float-report/${reportObjName}`);
      // TODO: create a new report in Database eg db.reports.create...
      //    Set reportUrl as `https://storage.googleapis.com/anchor-float-report/${reportObjName}`
      //    Connec to userSite based on userId variable passed in
    });
}

module.exports = { reportHandler };
