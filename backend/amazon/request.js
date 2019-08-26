const url = require('url');

const BASE_URL = 'http://webservices.amazon.com/onca/xml';

function getFullRequestURL(asin) {
  const stringToSign = getStringToSign(asin);
}

function timeAsIso() {
  return `${new Date().toISOString().split('.')[0]}Z`;
}
