const axios = require('axios');
const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const { createRequestFromAsins, getItemsPromise } = require('../../amazon/amzApi');

const db = getDB();

const sleep = milliseconds => new Promise(async resolve => await setTimeout(resolve, milliseconds));

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
    // await sleep(3000);

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
  } catch (error) {
    console.log('Caught error');
    console.log(error);
    throw new Error('Unhandled error');
  }
}

module.exports = { parseProductHandler };
