const ENDPOINT = 'webservices.amazon.com';
const REQUEST_URI = '/onca/xml';

function timeNowAsISO() {
  return `${new Date().toISOString().split('.')[0]}Z`;
}

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
    IdType: 'ASIN', // Passing a list of ASINs
  };

  function getUrl(asins) {
    if (!asins || !asins.length || asins.length > 10 || asins.length < 1) {
      throw new Error('Must pass between 1 and 10 asins as an array');
    }

    const dynamicParams = {
      ItemId: asins.join(','),
      Timestamp: timeNowAsISO(),
    };
    const fullParams = { ...staticParams, ...dynamicParams };

    // Sort params alphabetically
    // URI escape keys and values (or just values) <- TODO
    const orderedParams = {};
    Object.keys(fullParams).sort().forEach((key) => {
      orderedParams[key] = fullParams[key];
    });
    // Join keys and values `Operation=ItemLookup`
    // Join array of joined key/values with "&" <- this is the canonicalQueryString
    const canonicalQueryString = '';
    // Join to create string to sign
    const stringToSign = `GET\n${ENDPOINT}\n${REQUEST_URI}\n${canonicalQueryString}`;
    // Sign string to get signature
    // Create request URL with &Signature= at the end

    return '';
  }

  return {
    getUrl,
  };
}

module.exports = {
  amzApi,
};
