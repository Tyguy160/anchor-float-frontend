const axios = require('axios');
const { parseMarkup, countWords, parseHref } = require('./parsers');
const db = require('../db');
const { productParseQueue, shortlinkParseQueue } = require('./jobQueue');

async function pageParseProcessor(job) {
  const { url, pageId, contentSelector } = job.data;
  const { origin, pathname } = new URL(url);

  console.log(`Parsing page... | ${new Date().toUTCString()}\n${pathname}\n`);

  let parsedLinks;
  try {
    const response = await axios.get(url).catch(err => {
      throw new Error(err);
    });
    const { pageTitle, links } = parseMarkup(response.data, contentSelector);
    const wordCount = countWords({ markup: response.data });
    parsedLinks = links.map(link => {
      const parsedHref = parseHref(link.href, origin);
      return { ...link, parsedHref };
    });

    const { count } = await db.mutation.deleteManyLinks(
      { where: { page: { id: pageId } } },
      `{ count }`
    );

    if (count) {
      console.log(`Existing links found on page: ${count}\n${pathname}\n`);
    }

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

        // Handle amzn.to links
        if (hostname.includes('amzn.to')) {
          console.log(`Shortlink found, no action taken`);
          //   affiliateTagged = true;
          //   const newShortlink = await db.mutation.createLink(
          //     {
          //       data: {
          //         page: { connect: { id: pageId } },
          //         url: link.href,
          //         affiliateTagged,
          //       },
          //     },
          //     `{ id }`
          //   );
          //   shortlinkParseQueue.add({
          //     linkId: newShortlink.id,
          //     url: link.href,
          //   });
          //   return;
        }

        // Handle amazon.com links
        if (hostname.includes('amazon.com') && params.has('tag')) {
          affiliateTagged = true;
          affiliateTagName = params.get('tag');
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
          const asinRegexs = [
            /\/dp\/([^\?#\/]+)/i,
            /\/gp\/product\/([^\?#\/]+)/i,
          ];
          let captureGroup;
          const hasAsin = asinRegexs.some(regex => {
            captureGroup = pathname.match(regex);
            return captureGroup;
          });
          if (hasAsin) {
            const asin = captureGroup[1];

            const existingProduct = await db.query.product(
              {
                where: {
                  asin,
                },
              },
              `{ id asin availability }`
            );

            let productId = null;
            if (existingProduct) {
              productId = existingProduct.id;
              if (existingProduct.availability) {
                console.log(
                  `Existing availability data found\n${existingProduct.asin}\n`
                );
              } else {
                console.log(
                  `No existing availability data\n${existingProduct.asin}\n`
                );
                productParseQueue.add(
                  {
                    productId,
                  },
                  { attempts: 10 }
                );
              }
            } else {
              console.log(`No existing product found\n${asin}\n`);
              const product = await db.mutation.createProduct(
                {
                  data: {
                    asin,
                  },
                },
                `{ id }`
              );
              productId = product.id;
              productParseQueue.add(
                {
                  productId,
                },
                { attempts: 10 }
              );
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
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = pageParseProcessor;
