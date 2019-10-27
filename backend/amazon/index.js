const { amzApi } = require('./amzApi');
const { requestAndExtract } = require('./request');

const api = amzApi({
  associateTag: 'triplebar-20',
  awsAccessKey: 'AKIAJEGKAA3435XIBHOA',
  secretKey: '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',
});

const requestUrl = api.getUrl(['B07WNY2WKG', '032157351X']);
console.log(requestUrl);
requestAndExtract(requestUrl).then(details => console.log(details));
