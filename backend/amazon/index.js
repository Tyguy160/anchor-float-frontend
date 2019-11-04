require('dotenv').config();

const { createRequestFromAsins, getItemsPromise } = require('./amzApi');

const asins = ['B00005UP2P', 'B002T45X1G'];

async function main() {
  const requestUrl = await createRequestFromAsins(asins);
  let apiResp;
  try {
    apiResp = await getItemsPromise(requestUrl);
  } catch (err) {
    console.log(err);
  }

  console.log(JSON.stringify(apiResp, null, 1));

  let availability;
  const { offers } = apiResp ? apiResp[0] : null;
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
