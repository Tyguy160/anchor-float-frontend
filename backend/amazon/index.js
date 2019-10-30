const { productAdvertisingApi, getItemsRequest, callback } = require('./amzApi');

const api = productAdvertisingApi();
const asins = ['B07WNY2WKG', '032157351X', 'B004FDMZDS', 'B0002SR9BS', 'B00009OYGK'];
const req = getItemsRequest(asins);

try {
  api.getItems(req, callback);
} catch (ex) {
  console.log(`Exception: ${ex}`);
}
