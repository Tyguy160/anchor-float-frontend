const dotenv = require('dotenv');
const ProductAdvertisingAPIv1 = require('./src/index');

dotenv.config();

function productAdvertisingApi() {
  const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

  defaultClient.accessKey = process.env.AMAZON_ASSOCIATES_ACCESS_KEY;
  defaultClient.secretKey = process.env.AMAZON_ASSOCIATES_SECRET_KEY;

  defaultClient.host = process.env.AMAZON_ASSOCIATES_HOST;
  defaultClient.region = process.env.AMAZON_ASSOCIATES_REGION;

  const api = new ProductAdvertisingAPIv1.DefaultApi();

  return api;
}

function getItemsRequest(asins) {
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

function parseResponse(itemsResponseList) {
  const mappedResponse = {};
  itemsResponseList.forEach((item, i) => {
    mappedResponse[itemsResponseList[i].ASIN] = item;
  });
  return mappedResponse;
}

const callback = function callback(error, data, response) {
  if (error) {
    console.log('Error calling PA-API 5.0!');
    console.log(`Printing Full Error Object:\n${JSON.stringify(error, null, 1)}`);
    console.log(`Status Code: ${error.status}`);
    if (error.response !== undefined && error.response.text !== undefined) {
      console.log(`Error Object: ${JSON.stringify(error.response.text, null, 1)}`);
    }
  } else {
    console.log('API called successfully.');
    const getItemsResponse = ProductAdvertisingAPIv1.GetItemsResponse.constructFromObject(data);
    console.log(`Complete Response: \n${JSON.stringify(getItemsResponse, null, 1)}`);
    if (getItemsResponse.ItemsResult !== undefined) {
      console.log('Printing All Item Information in ItemsResult:');
      const reponseList = parseResponse(getItemsResponse.ItemsResult.Items);
      getItemsResponse.ItemsResult.Items.forEach((item) => {
        console.log(`\nPrinting information about the Item with Id: ${item.ASIN}`);
        if (item !== undefined) {
          if (item.ASIN !== undefined) {
            console.log(`ASIN: ${item.ASIN}`);
          }
          if (item.DetailPageURL !== undefined) {
            console.log(`DetailPageURL: ${item.DetailPageURL}`);
          }
          if (
            item.ItemInfo !== undefined
            && item.ItemInfo.Title !== undefined
            && item.ItemInfo.Title.DisplayValue !== undefined
          ) {
            console.log(`Title: ${item.ItemInfo.Title.DisplayValue}`);
          }
          if (
            item.Offers !== undefined
            && item.Offers.Listings !== undefined
            && item.Offers.Listings[0].Price !== undefined
            && item.Offers.Listings[0].Price.DisplayAmount !== undefined
          ) {
            console.log(`Buying Price: ${item.Offers.Listings[0].Price.DisplayAmount}`);
          }
        }
      });
    }

    if (getItemsResponse.Errors !== undefined) {
      console.log('\nErrors:');
      console.log(`Complete Error Response: ${JSON.stringify(getItemsResponse.Errors, null, 1)}`);
      console.log('Printing 1st Error:');
      const error_0 = getItemsResponse.Errors[0];
      console.log(`Error Code: ${error_0.Code}`);
      console.log(`Error Message: ${error_0.Message}`);
    }
  }
};

module.exports = { productAdvertisingApi, getItemsRequest, callback };
