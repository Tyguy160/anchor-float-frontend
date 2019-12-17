const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const {
  createRequestFromAsins,
  getItemsPromise,
  createVariationsRequestFromAsin,
  getVariationReq,
} = require('../../amazon/amzApi');
const progress = require('../../progress/index');
const productCache = require('../productCache');
const { variationProducer } = require('../producers');

const db = getDB();

async function parseProductHandler(messages) {
  const parsedMessages = messages.map(({ Body }) => ({
    asin: getDataFromMessage(Body, 'asin'),
    jobId: getDataFromMessage(Body, 'jobId'),
    taskId: getDataFromMessage(Body, 'taskId'),
  }));

  const keyByAsinReducer = (dict, { asin, jobId, taskId }) => {
    if (dict[asin]) {
      return {
        ...dict,
        [asin]: dict[asin].concat({
          asin,
          jobId,
          taskId,
        }),
      };
    }
    return {
      ...dict,
      [asin]: [
        {
          asin,
          jobId,
          taskId,
        },
      ],
    };
  };

  // Make a dictionary of ASIN => jobId & taskId
  const asinToMessageDataMap = parsedMessages.reduce(keyByAsinReducer, {});

  const uniqueAsins = [...new Set(parsedMessages.map(info => info.asin))];
  const requestUrl = createRequestFromAsins(uniqueAsins); // create the request object

  let apiResponse;
  try {
    apiResponse = await getItemsPromise(requestUrl); // call the API
  } catch (err) {
    console.log('There was an error with the API request');
    throw Error('API response error'); // Put all items back into the queue
  }

  const { items, errors } = apiResponse;

  if (items) {
    items.forEach(async item => {
      const { offers, name, asin, parentAsin } = item;

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
      } else if (parentAsin === null) {
        const sleep = milliseconds => {
          return new Promise(resolve => setTimeout(resolve, milliseconds));
        };
        // ASIN is a parent, so we fetch the children/variations
        const variationReq = createVariationsRequestFromAsin(asin);

        var nonErrorRes = false;
        var response;
        while (!nonErrorRes) {
          response = await getVariationReq(variationReq);
          if (!response.errors) {
            nonErrorRes = true;
            console.log('Got response');
          } else {
            console.log('Sleeping');
            sleep(3000);
          }
        }

        const { items } = response;

        if (!items || !items.length) {
          availability = 'UNAVAILABLE';
        } else {
          const varAvailable = items.some(({ offers: variationOffers }) => {
            return variationOffers.some(
              ({ DeliveryInfo: variationDeliveryInfo }) => {
                const {
                  IsAmazonFulfilled,
                  IsFreeShippingEligible,
                  IsPrimeEligible,
                } = variationDeliveryInfo;
              }
            );
          });

          availability = varAvailable ? 'AMAZON' : 'UNAVAILABLE';
        }
      } else {
        availability = 'UNAVAILABLE';
      }

      const existingProduct = await db.products.findOne({
        where: {
          asin,
        },
      });

      if (!existingProduct) {
        console.log(
          `ERR: Product ${asin} should already exist in DB but was not found`
        );
        return;
      }

      await db.products.update({
        where: { id: existingProduct.id },
        data: {
          asin,
          availability,
          name,
        },
      });

      productCache.setProductUpdated(asin);
      productCache.deleteProductQueued(asin);

      const tasksForProduct = asinToMessageDataMap[asin];

      if (tasksForProduct.length > 0) {
        tasksForProduct.forEach(async task => {
          progress.productFetchCompleted({
            jobId: task.jobId,
            taskId: task.taskId,
          });
        });
      }
    });
  }

  if (errors) {
    // Usually items no longer sold
    errors.forEach(async err => {
      // Update items as unavailable
      const { asin } = err;

      if (!asin) return;

      const existingProduct = await db.products.findOne({
        where: {
          asin,
        },
      });

      if (!existingProduct) {
        console.log(
          `ERR: Product ${asin} should already exist in DB but was not found`
        );
        return;
      }

      await db.products.update({
        where: { id: existingProduct.id },
        data: { availability: 'UNAVAILABLE' },
      });
      productCache.setProductUpdated(asin);

      const tasksForProduct = asinToMessageDataMap[asin];

      if (tasksForProduct.length > 0) {
        tasksForProduct.forEach(async task => {
          progress.productFetchCompleted({
            jobId: task.jobId,
            taskId: task.taskId,
          });
        });
      }
    });
  }
}

module.exports = { parseProductHandler };
