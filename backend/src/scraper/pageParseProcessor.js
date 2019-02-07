const axios = require('axios');
const { parseMarkup, countWords, parseHref } = require('./parsers');
const db = require('../db');
const { productParseQueue } = require('./jobQueue');

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

    const { count } = await db.mutation.deleteManyLinks(
      { where: { page: { id: pageId } } },
      `{ count }`
    );

    await processAllLinks(parsedLinks);
    async function processAllLinks(links) {
      for (link of links) {
        await processLink(link);
      }
    }
    async function processLink(link) {
      const { isValid, params, hostname, pathname } = link.parsedHref;
      if (isValid) {
        let affiliateTagged = null;
        let affiliateTagName = null;

        // Handle Amazon links
        if (hostname.includes('amazon.com') && params.has('tag')) {
          affiliateTagged = true;
          affiliateTagName = params.get('tag');
        }

        // Handle amzn.to links
        if (hostname.includes('amzn.to')) {
          affiliateTagged = true;
        }

        const newLink = await db.mutation.createLink(
          {
            data: {
              page: { connect: { id: pageId } },
              url: link.href,
              affiliateTagged,
              affiliateTagName,
            },
          },
          `{ id }`
        );

        if (hostname.includes('amazon.com')) {
          const asinRegex = /\/dp\/([^\?#\/]+)/i;
          const foundAsin = pathname.match(asinRegex);
          if (foundAsin) {
            const asin = foundAsin[1];

            const existingProduct = await db.query.product(
              {
                where: {
                  asin,
                },
              },
              `{ id asin }`
            );

            let productId = null;
            if (existingProduct) {
              productId = existingProduct.id;
            } else {
              const product = await db.mutation.createProduct(
                {
                  data: {
                    asin,
                  },
                },
                `{ id }`
              );

              productId = product.id;
              productParseQueue.add({
                productId,
              });
            }

            await db.mutation.updateLink({
              where: { id: newLink.id },
              data: {
                product: { connect: { id: productId } },
              },
            });
          }
        }
      }
    }

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
    return Promise.reject(error);
  }
}

module.exports = pageParseProcessor;
