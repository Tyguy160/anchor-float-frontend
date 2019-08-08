function constructProductUrl({ asin }) {
  return `http://www.amazon.com/dp/${asin}`;
}

module.exports = { constructProductUrl };
