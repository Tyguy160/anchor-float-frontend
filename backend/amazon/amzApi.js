const crypto = require('crypto');

function amzApi({ associateTag, awsAccessKey, secretKey }) {
  if (!awsAccessKey || !secretKey || !associateTag) {
    throw new Error('Must provide associateTag, awsAccessKey, and secretKey');
  }

  const staticParams = {
    AssociateTag: associateTag,
    AWSAccessKeyId: awsAccessKey,
    Service: 'AWSECommerceService',
    Operation: 'ItemLookup',
    ResponseGroup: 'Large', // Determines what the response contains
  };

  function getUrl(asins) {
    if (!asins || !asins.length || asins.length > 10 || asins.length < 1) {
      throw new Error('Must pass between 1 and 10 asins as an array');
    }

    const dynamicParams = {
      ItemId: asins.join(','),
      Timestamp: `${new Date().toISOString().split('.')[0]}Z`, // Time with ms dropped
    };
    const fullParams = { ...staticParams, ...dynamicParams };

    const paramMap = Object.keys(fullParams)
      .sort() // Amazon require the params to be sorted for signing
      .map(key => [key, fullParams[key]]);

    const canonicalQueryString = new URLSearchParams(paramMap).toString();

    const ENDPOINT = 'webservices.amazon.com';
    const REQUEST_URI = '/onca/xml';
    const stringToSign = `GET\n${ENDPOINT}\n${REQUEST_URI}\n${canonicalQueryString}`;

    const hmac = crypto.createHmac('sha256', secretKey); // Sign string and convert to base64
    hmac.update(stringToSign);
    const signature = hmac.digest('base64');

    const signatureQueryString = new URLSearchParams([['Signature', signature]]).toString();

    return `https://${ENDPOINT}${REQUEST_URI}?${canonicalQueryString}&${signatureQueryString}`;
  }

  return {
    getUrl,
  };
}

module.exports = {
  amzApi,
};
