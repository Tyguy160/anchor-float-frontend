const { Storage } = require('@google-cloud/storage');

function getDataFromMessage(messageBody, dataKey) {
  const body = JSON.parse(messageBody);
  if (!(dataKey in body)) {
    console.log(`Key "${dataKey}" not found in message body`);
    return null;
  }
  return body[dataKey];
}

async function uploadFile(bucketName, filename) {
  const storage = new Storage();

  await storage.bucket(bucketName).upload(filename, {
    gzip: true,
    destination: 'some-random-bucket-name',
    metadata: {
      cacheControl: 'public, max-age=31536000',
      contentDisposition: 'attachment; filename="amazon-link-report.csv"',
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

module.exports = { getDataFromMessage, uploadFile };
