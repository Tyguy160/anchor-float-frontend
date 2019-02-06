function constructProductUrl({ asin }) {
  return `https://www.amazon.com/dp/${asin}`;
}

function isAmazonProductLink(href) {
  console.log('WARNING: isAmazonProductLink always returns true');
  return true;
}

module.exports = { constructProductUrl, isAmazonProductLink };
