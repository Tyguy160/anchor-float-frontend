const axios = require('axios');
const { parseProductPageMarkup } = require('./parsers');
const { constructProductUrl } = require('./utils');
const db = require('../db');

class ProductNotFoundError extends Error {}
class NoProductIdError extends Error {}
class NoASINError extends Error {}

// assumes a product with an ASIN exists in the database
// updates the product information in the DB by:
// 1. Getting the ASIN to construct the Amazon URL
// 2. Fetching the markup with axios (and eventually through a proxy)
// 3. Parsing the markup with the parser
// 4. Updating the product in the database
async function productParseProcessor(job) {
  try {
    const { productId } = job.data;

    if (!productId) {
      throw new NoProductIdError('Parser must be called with a productId');
    }
    console.log(`Parsing ${productId} at: ${new Date().toUTCString()}\n`);

    const product = await db.query.product(
      {
        where: { id: productId },
      },
      `{ id, asin }`
    );

    if (!product) {
      throw new ProductNotFoundError(
        `Product with id: ${productId} not found in database`
      );
    }

    if (!product.asin) {
      throw new NoASINError('Product does not have an ASIN value');
    }

    const productPageUrl = constructProductUrl({ asin: product.asin });

    const headers = {
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
    };

    const { data, status } = await axios
      .get(productPageUrl, { headers })
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      });

    if (status < 200 || status >= 300) {
      throw new Error(`Page did not return a 200 range status code: ${status}`);
    }
    const productInfo = parseProductPageMarkup(data);

    const updatedProductData = {
      name: productInfo.name,
    };

    if (productInfo.availability.includes('unavailable')) {
      updatedProductData.availability = 'UNAVAILABLE';
    } else if (productInfo.availability.includes('these sellers')) {
      updatedProductData.availability = 'THIRDPARTY';
    } else if (productInfo.availability.toLowerCase().includes('in stock')) {
      updatedProductData.availability = 'AMAZON';
    }

    const updatedProduct = await db.mutation.updateProduct({
      where: {
        id: productId,
      },
      data: updatedProductData,
    });

    return Promise.resolve(updatedProduct);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = productParseProcessor;
