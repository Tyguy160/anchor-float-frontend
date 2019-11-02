const { createRequestFromAsins, getItemsPromise } = require('./amzApi');

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const asin = 'B01IE7QJDW';

async function main() {
  // Create an Amazon Product Advertising API request
  const requestUrl = await createRequestFromAsins([asin]);
  // console.log(requestUrl);

  // Get the response from the API
  const apiResp = await getItemsPromise(requestUrl);

  // Rate limit each request
  // await sleep(5000);

  console.log(JSON.stringify(apiResp[0], null, 1));

  let availability;

  const { offers } = apiResp[0];
  if (offers) {
    const { IsAmazonFulfilled, IsFreeShippingEligible, IsPrimeEligible } = offers[0].DeliveryInfo;
    if (IsAmazonFulfilled || IsFreeShippingEligible || IsPrimeEligible) {
      availability = 'HIGH_CONV';
    } else {
      availability = 'LOW_CONV';
    }
  } else {
    availability = 'UNAVAILABLE';
  }

  console.log(`Availability: ${availability}`);

  // 1) Is there a product with this ASIN?
  // 2) Does the product have any offers? --> if no, unavailable
  // 3) If the product has offers,
  // "in stock"
  // "usually ships within 6 to 10 days"
  // ""

  // DeliveryInfo
  // IsAmazonFullfilled || IsFreeShippingEligible || IsPrimeEligible --> High converting or Low converting
  //
}

main();
