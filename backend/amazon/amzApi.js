const dotenv = require('dotenv');
const ProductAdvertisingAPIv1 = require('./src/index');

dotenv.config();

const sleep = milliseconds => new Promise(async resolve => await setTimeout(resolve, milliseconds));

async function createRequestFromAsins(asins) {
  // await sleep(3000);
  const configuredRequest = new ProductAdvertisingAPIv1.GetItemsRequest();

  configuredRequest.PartnerTag = process.env.AMAZON_ASSOCIATES_PARTNER_TAG;
  configuredRequest.PartnerType = process.env.AMAZON_ASSOCIATES_PARTNER_TYPE;

  // The items to request ['B07WNY2WKG', '032157351X', 'B004FDMZDS', 'B0002SR9BS', 'B00009OYGK']
  configuredRequest.ItemIds = asins;

  configuredRequest.Condition = process.env.AMAZON_ASSOCIATES_ITEM_CONDITION;

  configuredRequest.Resources = [
    'CustomerReviews.Count',
    'CustomerReviews.StarRating',
    'Images.Primary.Medium',
    'ItemInfo.Title',
    'Offers.Listings.Availability.Message',
    'Offers.Listings.Availability.Type',
    'Offers.Listings.Condition',
    'Offers.Listings.DeliveryInfo.IsAmazonFulfilled',
    'Offers.Listings.DeliveryInfo.IsFreeShippingEligible',
    'Offers.Listings.DeliveryInfo.IsPrimeEligible',
    'Offers.Listings.IsBuyBoxWinner',
    'Offers.Listings.Price',
    'Offers.Summaries.OfferCount',
  ];

  return configuredRequest;
}

async function getItemsPromise(apiRequest) {
  // await sleep(3000);
  const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

  defaultClient.accessKey = process.env.AMAZON_ASSOCIATES_ACCESS_KEY;
  defaultClient.secretKey = process.env.AMAZON_ASSOCIATES_SECRET_KEY;

  defaultClient.host = process.env.AMAZON_ASSOCIATES_HOST;
  defaultClient.region = process.env.AMAZON_ASSOCIATES_REGION;

  const api = new ProductAdvertisingAPIv1.DefaultApi();
  return new Promise((resolve, reject) => {
    api.getItems(apiRequest, (error, data) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      if (data.Errors !== undefined) {
        console.log('Data error');
        console.log(data.Errors);

        // const formattedItems = data.ItemsResult.Items.map(item => ({
        //   asin: item.ASIN,
        //   name: item.ItemInfo.Title.DisplayValue,
        //   offers: item.Offers ? item.Offers.Listings : null,
        // }));

        return reject(data.Errors);
      }

      // console.log(JSON.stringify(data.ItemsResult.Items, null, 1));

      const formattedItems = data.ItemsResult.Items.map(item => ({
        asin: item.ASIN,
        name: item.ItemInfo.Title.DisplayValue,
        offers: item.Offers ? item.Offers.Listings : null,
      }));

      return resolve(formattedItems);
    });
  });
}

module.exports = { createRequestFromAsins, getItemsPromise };
