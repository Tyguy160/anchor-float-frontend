const axios = require('axios');
const { parseMarkup, countWords } = require('./scraper');

const pageParseProcessor = async function(job) {
  try {
    const { data } = await axios.get(job.data.url);
    const { pageTitle, links } = parseMarkup(data);
    const wordCount = countWords({ markup: data });
    console.log({ pageTitle, links, wordCount });
  } catch (error) {
    console.log(error);
  }

  return Promise.resolve({ data: 'worked' });
};

module.exports = pageParseProcessor;
