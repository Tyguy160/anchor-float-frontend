const axios = require('axios');
const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const { createRequestFromAsins, getItemsPromise } = require('../../amazon/amzApi');

const db = getDB();

async function parseProductHandler({ Body, MessageId }) {
  try {
    // Get the product ASIN from the link parser
    const asin = getDataFromMessage(Body, 'asin');
    // console.log(asin);

    // Create an Amazon Product Advertising API request
    const requestUrl = await createRequestFromAsins([asin]);
    // console.log(requestUrl);

    // Get the response from the API
    const apiResp = await getItemsPromise(requestUrl);
    console.log(apiResp);

    // Get the linkId from the link parser
    const linkId = getDataFromMessage(Body, 'linkId');

    // If there's no ASIN, do nothing
    if (!asin) return;

    // Otherwise, check the DB for a product with that ASIN
    const existingProduct = await db.products.findOne({
      where: {
        asin,
      },
    });

    // Found the product? Print it out
    if (existingProduct) {
      console.log(`Existing product: ${existingProduct}`);
    }

    // If the product exists and it has some type of availability listed,
    // we're going to update it
    if (existingProduct && existingProduct.availability) {
      const currentTime = new Date().getTime();
      const updatedAt = new Date(existingProduct.updatedAt).getTime();
      const MIN_CONVERSION = 1000 * 60;
      const minutesSinceUpdate = (currentTime - updatedAt) / MIN_CONVERSION;
      //   console.log(`Updated ${asin} ${minutesSinceUpdate.toFixed(1)} mins ago\n`);

      // Update the product if the data is more than a certain amount of time old
      if (
        minutesSinceUpdate < 1440
        && ['AMAZON', 'THIRDPARTY', 'UNAVAILABLE'].some(avail => existingProduct.availability.includes(avail))
      ) {
        if (linkId) {
          await db.links.update({
            where: { id: linkId },
            data: { product: { connect: { id: existingProduct.id } } },
          });
        }
        // console.log(`Skipping... ${existingProduct.availability} when last updated\n`);
        return;
      }
    }

    // If the product doesn't exist yet, we're going to create it
    let newProduct;
    let availability;

    const { offers, name } = apiResp[0];

    if (offers) {
      const { IsAmazonFulfilled, IsFreeShippingEligible, IsPrimeEligible } = offers[0].DeliveryInfo;
      if (IsAmazonFulfilled || IsFreeShippingEligible || IsPrimeEligible) {
        availability = 'AMAZON';
      } else {
        availability = 'THIRDPARTY';
      }
    } else {
      availability = 'UNAVAILABLE';
    }
    console.log(`Product ASIN: ${asin}`);
    console.log(`Product Name: ${name}`);
    console.log(`Product Availability: ${availability}`);

    try {
      if (!existingProduct) {
        newProduct = await db.products.create({
          data: {
            asin,
            availability,
            name,
          },
        });

        if (linkId) {
          await db.links.update({
            where: { id: linkId },
            data: { product: { connect: { id: newProduct.id } } },
          });
        }
      }
    } catch (err) {
      throw new Error(err.message);
    }
    //     // Get product data from Amazon
    //     const productPageUrl = constructProductUrl({ asin });
    //     console.log(productPageUrl);
    //     const { data, status } = await axios
    //       .get(proxy.token + productPageUrl, {
    //         proxy,
    //         headers: {
    //           'User-Agent':
    //             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
    //         },
    //         resposneType: 'text',
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         if (err.response) {
    //           return err.response;
    //         }
    //         throw new Error(err);
    //       });
    //     console.log(`Status: ${status}`);
    //     if (status === 429 || status === 503 || status === 400 || status === 520 || status === 500) {
    //       console.log(`Got res code: ${status}\nRequeued product: ${asin}\n`);
    //       throw new Error('Non 200 Amazon response');
    //     }
    //     if ((status < 200 || status >= 300) && status !== 404) {
    //       console.log(`Got res code: ${status} for ${asin}\nNot requeued\n`);
    //       return;
    //     }
    //     const updatedProductData = {};
    //     if (status === 404) {
    //       updatedProductData.availability = 'UNAVAILABLE';
    //       updatedProductData.name = 'Not Found';
    //     } else {
    //       const productInfo = parseProductPageMarkup(data);
    //       console.log(productInfo.availability);
    //       updatedProductData.name = productInfo.name || 'Not Found';
    //       if (productInfo.availability.toLowerCase().includes('unavailable')) {
    //         updatedProductData.availability = 'UNAVAILABLE';
    //       } else if (productInfo.availability.toLowerCase().includes('these sellers')) {
    //         updatedProductData.availability = 'THIRDPARTY';
    //       } else if (
    //         productInfo.availability.toLowerCase().includes('in stock')
    //         || productInfo.availability.toLowerCase().includes('ships within')
    //         || productInfo.availability.toLowerCase().includes('available to ship')
    //       ) {
    //         updatedProductData.availability = 'AMAZON';
    //       }
    //     }
    //     const updatedProduct = await db.mutation.updateProduct({
    //       where: { asin },
    //       data: updatedProductData,
    //     });
    //     console.log(
    //       `Updated product ${asin}: ${updatedProductData.availability || 'Unrecognized Amazon Page'}\n`,
    //     );
    //     // Connect the link if a link ID was passed
    //     if (!linkId) {
    //       console.log('No link ID passed');
    //       return;
    //     }
    //     await db.mutation.updateLink({
    //       where: { id: linkId },
    //       data: { product: { connect: { id: updatedProduct.id } } },
    //     });
  } catch (error) {
    console.log('Caught error');
    console.log(error);
    throw new Error('Unhandled error');
  }
}

module.exports = { parseProductHandler };
