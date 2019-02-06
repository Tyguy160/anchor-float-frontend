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

    // Process all the links found on the page
    // 1. If a link is valid, create a new link in the database
    //    TODO: Prevent duplicates if ran twice on same page
    // 2. If the link is an amazon product link, connect or create a product
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
        // TODO: Get ASIN from link and see if a product exists
        //   Create and link Product if it doesn't
        //   (which should add a productPagePrase job)
        //   OR
        //   Connect the existing Product to the Link
        if (hostname.includes('amazon.com') || hostname.includes('amzn.to')) {
          affiliateTagged = params.has('tag') || hostname.includes('amzn.to');
          // TODO: Doesn't get AffiliateTagName for amzn.to links
          if (affiliateTagged && params.has('tag')) {
            affiliateTagName = params.get('tag');
          }
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

        let asin = null;
        let productId = null;
        if (hostname.includes('amazon.com')) {
          const asinRegex = /\/dp\/([^\?#\/]+)/i;
          const foundAsin = pathname.match(asinRegex);
          if (foundAsin) {
            asin = foundAsin[1];

            const existingProduct = await db.query.product(
              {
                where: {
                  asin,
                },
              },
              `{ id asin }`
            );

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
