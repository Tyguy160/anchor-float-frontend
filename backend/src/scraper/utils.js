function constructProductUrl({ asin }) {
  return `https://www.amazon.com/dp/${asin}`;
}

module.exports = { constructProductUrl };
