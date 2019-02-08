function constructProductUrl({ asin }) {
  return `https://www.amazon.com/dp/${asin}`;
}

function getRequestHeaders(index) {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15',
  ];
  let userAgent;
  if (index >= 0 && index < userAgents.length) {
    userAgent = userAgents[index];
  } else {
    userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  }

  return {
    'user-agent': userAgent,
  };
}

module.exports = { constructProductUrl, getRequestHeaders };
