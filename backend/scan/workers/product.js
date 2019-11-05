const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const { createRequestFromAsins, getItemsPromise } = require('../../amazon/amzApi');

const db = getDB();

async function parseProductHandler(messages) {
  const parsedMessages = messages.map(({ Body }) => ({
    asin: getDataFromMessage(Body, 'asin'),
    linkId: getDataFromMessage(Body, 'linkId'),
  }));

  // Make a dictionary of ASIN => linkIds
  const asinToLinkIdMap = parsedMessages.reduce((dict, message) => {
    const { asin, linkId } = message;

    if (dict[asin]) {
      dict[asin].push(linkId);
    } else {
      dict[asin] = [linkId];
    }

    return dict;
  }, {});

  const uniqueAsins = [...new Set(parsedMessages.map(info => info.asin))];
  const requestUrl = await createRequestFromAsins(uniqueAsins); // create the request object

  let apiResponse;
  try {
    apiResponse = await getItemsPromise(requestUrl); // call the API
  } catch (err) {
    console.log('There was an error with the API request');
    throw Error('API response error');
  }

  const { items, errors } = apiResponse;

  if (items) {
    items.forEach(async (item) => {
      // Update the items in here
      // console.log(item);

      const { offers, name, asin } = item;
      const linkId = asinToLinkIdMap[asin];

      // If the product doesn't exist yet, we're going to create it
      let newProduct;
      let availability;

      if (offers) {
        const {
          IsAmazonFulfilled,
          IsFreeShippingEligible,
          IsPrimeEligible,
        } = offers[0].DeliveryInfo;
        if (IsAmazonFulfilled || IsFreeShippingEligible || IsPrimeEligible) {
          availability = 'AMAZON'; // HIGH-CONV
        } else {
          availability = 'THIRDPARTY'; // LOW-CONV
        }
      } else {
        availability = 'UNAVAILABLE';
      }
      console.log(`Product ASIN: ${asin}`);
      console.log(`Product Name: ${name}`);
      console.log(`Product Availability: ${availability}`);

      let existingProduct = await db.products.findOne({
        where: {
          asin,
        },
      });

      // If the product exists and it has some type of availability listed,
      // we're going to update the link to the product
      if (existingProduct && linkId.length) {
        existingProduct = await db.products.update({
          where: { id: existingProduct.id },
          data: {
            asin,
            availability,
            name,
          },
        });
        linkId.forEach(async (id) => {
          await db.links.update({
            where: { id },
            data: { product: { connect: { id: existingProduct.id } } },
          });
        });
      }

      try {
        if (!existingProduct) {
          newProduct = await db.products.create({
            data: {
              asin,
              availability,
              name,
            },
          });

          if (linkId.length) {
            linkId.forEach(async (id) => {
              await db.links.update({
                where: { id },
                data: { product: { connect: { id: newProduct.id } } },
              });
            });
          }
        }
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    });
  }

  if (errors) {
    errors.forEach((err) => {
      // Update items as unavailable
      console.log(err);
      // Use asinToLinkIdMap to ensure each link is connected
    });
  }
}

module.exports = { parseProductHandler };
