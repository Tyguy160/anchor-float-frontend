const axios = require('axios');
const { parseMarkup, countWords, parseHref } = require('./parsers');
const db = require('../db');

async function pageParseProcessor(job) {
  const { url, origin, pageId } = job.data;
  let parsedLinks;
  try {
    const response = await axios.get(url);
    const { pageTitle, links } = parseMarkup(response.data);
    const wordCount = countWords({ markup: response.data });
    parsedLinks = links.map(link => {
      const parsedHref = parseHref(link.href, origin);
      return { ...link, parsedHref };
    });

    // Create a new link in the database for each link found
    const linkIds = parsedLinks.map(async link => {
      const createdLink = await db.mutation.createLink({
        data: {
          page: { connect: { id: pageId } },
          url: link.href,
        },
      });
      return { id: createdLink.id };
    });

    await db.mutation.updatePage({
      where: {
        id: pageId,
      },
      data: {
        wordCount,
        pageTitle,
      },
    });

    return Promise.resolve({ pageTitle, links: parsedLinks, wordCount });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = pageParseProcessor;
