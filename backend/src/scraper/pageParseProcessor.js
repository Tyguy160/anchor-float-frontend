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
    console.log('Done parsing everything...');

    // Create a new link in the database for each link found
    console.log('Making links in DB...');
    const linkIds = parsedLinks.map(async link => {
      const link = await db.mutation.createLink({
        data: {
          page: pageId,
          url: link.href,
        },
      });
      return { id: link.id };
    });

    console.log('Updating page with wordCount and Links...');
    await db.mutation.updatePage({
      where: {
        id: pageId,
      },
      data: {
        links: {
          connect: [linkIds],
        },
        wordCount,
        pageTitle,
      },
    });

    console.log('Job complete');
    return Promise.resolve({ pageTitle, links: parsedLinks, wordCount });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = pageParseProcessor;
