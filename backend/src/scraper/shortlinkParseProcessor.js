const axios = require('axios');
const { getRequestHeaders } = require('./utils');
const db = require('../db');
const { productParseQueue } = require('./jobQueue');

// Assumes a link has been created in the DB (need link ID)
// and resolves the link info for affiliateTagName and product
async function shortlinkParseProcessor(job) {
  try {
    const { linkId, url } = job.data;

    if (!url.includes('amzn.to')) {
      throw new Error(`URL is not an Amazon shortlink:\n${url}`);
    }

    const reqHeaders = getRequestHeaders();
    const { status, headers } = await axios
      .get(url, { headers: reqHeaders, maxRedirects: 0 })
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      });

    if (status < 300) {
      throw new Error(`Page did not return a redirect code: ${status}`);
    }

    const { location } = headers;

    if (!location.includes('amazon.co')) {
      throw new Error(
        `Location does not correspond to an Amazon page:\n${location}\n`
      );
    }

    const asinRegex = /\/dp\/([^\?#\/]+)/i;
    const foundAsin = location.match(asinRegex);
    let updatedLink;
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

      const { searchParams } = new URL(location);
      const params = new Map(searchParams);
      const affiliateTagName = params.get('tag');

      updatedLink = await db.mutation.updateLink({
        where: { id: linkId },
        data: {
          affiliateTagName,
          product: { connect: { id: productId } },
        },
      });
    }

    return Promise.resolve(updatedLink);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = shortlinkParseProcessor;
