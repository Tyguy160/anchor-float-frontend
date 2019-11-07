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

const cryptoStringConfig = { length: 11, characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' };

async function reportHandler({ Body, MessageId }) {
  const userId = getDataFromMessage(Body, 'userId');
  const hostname = getDataFromMessage(Body, 'hostname');

  const allPagesArray = await getData(hostname).catch(console.log);
  const allPagesJson = JSON.stringify(allPagesArray);

  const readableJsonStream = Readable();
  readableJsonStream.push(allPagesJson);
  readableJsonStream.push(null);

  const json2csv = new Transform(csvOptions, transformOpts);

  const reportObjName = cryptoRandomString(cryptoStringConfig);
  const newReportFile = reportBucket.file(reportObjName);
  const storageWriteStream = newReportFile.createWriteStream({
    gzip: true,
    metadata: {
      contentType: 'text/csv',
      contentLanguage: 'en',
      contentDisposition: 'attachment; filename="amazon-link-report.csv"',
      cacheControl: 'public, max-age=31536000',
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
      console.log(`Wrote CSV to file: ${reportObjName}`);
    });
}

module.exports = { reportHandler };
