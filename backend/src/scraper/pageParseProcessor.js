const axios = require('axios');
const { parseMarkup, countWords, parseHref } = require('./parsers');

async function pageParseProcessor(job) {
  const { url } = job.data;
  try {
    const response = await axios.get(url);
    const { pageTitle, links } = parseMarkup(response.data);
    const wordCount = countWords({ markup: response.data });
    const parsedLinks = links.map(link => {
      const parsedHref = parseHref(link.href);
      return { ...link, parsedHref };
    });
    return Promise.resolve({ pageTitle, links: parsedLinks, wordCount });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = pageParseProcessor;
