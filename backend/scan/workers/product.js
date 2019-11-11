const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const { createRequestFromAsins, getItemsPromise } = require('../../amazon/amzApi');
const progress = require('../../manager/index');

const db = getDB();

async function parseProductHandler(messages) {
  const parsedMessages = messages.map(({ Body, MessageId }) => ({
    asin: getDataFromMessage(Body, 'asin'),
    linkId: getDataFromMessage(Body, 'linkId'),
    jobId: getDataFromMessage(Body, 'jobId'),
    taskId: MessageId,
  }));

  const keyByAsinReducer = (dict, {
    asin, linkId, jobId, taskId,
  }) => {
    if (dict[asin]) {
      return {
        ...dict,
        [asin]: dict[asin].concat({
          asin, linkId, jobId, taskId,
        }),
      };
    }
    return {
      ...dict,
      [asin]: [{
        asin, linkId, jobId, taskId,
      }],
    };
  };

  // Make a dictionary of ASIN => linkIds
  const asinToMessageDataMap = parsedMessages.reduce(keyByAsinReducer, {});

  const uniqueAsins = [...new Set(parsedMessages.map(info => info.asin))];
  const requestUrl = await createRequestFromAsins(uniqueAsins); // create the request object

  let apiResponse;
  try {
    apiResponse = await getItemsPromise(requestUrl); // call the API
  } catch (err) {
    console.log('There was an error with the API request');
    throw Error('API response error'); // Put all items back into the queue
  }

  const { items, errors } = apiResponse;

  if (items) {
    items.forEach(async (item) => {
      const { offers, name, asin } = item;

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

      let existingProduct = await db.products.findOne({
        where: {
          asin,
        },
      });

      const tasksForProduct = asinToMessageDataMap[asin];

      if (existingProduct && tasksForProduct.length) {
        existingProduct = await db.products.update({
          where: { id: existingProduct.id },
          data: {
            asin,
            availability,
            name,
          },
        });

        tasksForProduct.forEach(async (task) => {
          await db.links.update({
            where: { id: task.linkId },
            data: { product: { connect: { id: existingProduct.id } } },
          });

          progress.productFetchCompleted({ jobId: task.jobId, taskId: task.taskId });
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

          if (tasksForProduct.length) {
            tasksForProduct.forEach(async (task) => {
              await db.links.update({
                where: { id: task.linkId },
                data: { product: { connect: { id: newProduct.id } } },
              });

              progress.productFetchCompleted({ jobId: task.jobId, taskId: task.taskId });
            });
          }
        }
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    });
  }

  if (errors) { // Usually items no longer sold
    errors.forEach(async (err) => {
      // Update items as unavailable
      // Use asinToMessageDataMap to ensure each link is connected
      const { asin } = err;

      if (!asin) return;

      let existingProduct = await db.products.findOne({
        where: {
          asin,
        },
      });

      if (existingProduct) {
        await db.products.update({
          where: { id: existingProduct.id },
          data: { availability: 'UNAVAILABLE' },
        });
      }

      if (!existingProduct) {
        existingProduct = await db.products.create({
          data: {
            asin,
            availability: 'UNAVAILABLE',
          },
        });
      }

      const tasksForProduct = asinToMessageDataMap[asin];
      if (tasksForProduct.length > 0) {
        tasksForProduct.forEach(async (task) => {
          await db.links.update({
            where: { id: task.linkId },
            data: { product: { connect: { id: existingProduct.id } } },
          });

          progress.productFetchCompleted({ jobId: task.jobId, taskId: task.taskId });
        });
      }
    });
  }
}

module.exports = { parseProductHandler };
