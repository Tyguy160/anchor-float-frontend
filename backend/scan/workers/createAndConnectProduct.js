const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const productCache = require('../productCache');
const progress = require('../../progress/index');
const { productProducer } = require('../producers');

const db = getDB();

async function createAndConnectProductHandler({ Body }) {
  const asin = getDataFromMessage(Body, 'asin');
  const linkId = getDataFromMessage(Body, 'linkId');

  const jobId = getDataFromMessage(Body, 'jobId');
  const taskId = getDataFromMessage(Body, 'taskId');

  let dbProduct = await db.products.findOne({
    where: {
      asin,
    },
  });

  if (!dbProduct) {
    dbProduct = await db.products.create({
      data: {
        asin,
      },
    });
  }

  await db.links.update({
    where: { id: linkId },
    data: {
      product: {
        connect: {
          id: dbProduct.id,
        },
      },
    },
  });

  const productUpdatedRecently = await productCache.isRecentlyUpdated(asin);

  if (productUpdatedRecently) {
    console.log(`${asin} UPDATED RECENTLY - SKIPPING`);
    progress.productFetchCompleted({ jobId, taskId });
  } else {
    console.log(`${asin} NOT UPDATED - ADDING`);
    productProducer.send(
      [
        {
          id: taskId,
          body: JSON.stringify({
            asin,
            jobId,
            taskId,
          }),
        },
      ],
      (err) => {
        if (err) console.log(err);
      },
    );
  }
}

module.exports = { createAndConnectProductHandler };
