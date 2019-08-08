const axios = require('axios');
const { proxy } = require('./proxySettings');
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

    const httpUrl = new URL(url);
    httpUrl.protocol = 'http';

    const { status, headers } = await axios
      .get(httpUrl.href, { proxy, maxRedirects: 0 })
      .catch(err => {
        if (err.response) {
          return err.response;
        } else {
          throw new Error(err);
        }
      });

    if (status < 300) {
      throw new Error(`Page did not return a redirect code: ${status}`);
    }

    let { location } = headers;

    let tries = 0;
    while (!location.includes('amazon.co') && tries < 10) {
      console.log(
        `Unrecognized location: ${location}\nRefetching (${tries})...\n`
      );
      const { headers } = await axios
        .get(location, { proxy, maxRedirects: 0 })
        .catch(err => {
          if (err.response) {
            return err.response;
          } else {
            throw new Error(err);
          }
        });

      location = headers.location;
      tries++;
    }

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
        productParseQueue.add(
          {
            productId,
          },
          { attempts: 10 }
        );
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
