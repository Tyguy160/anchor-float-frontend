const { createRequestFromAsins, getItemsPromise } = require('./amzApi');

const asins = ['B000Z7LLQ0', 'B016MIL8YA'];
const req = createRequestFromAsins(asins);


getItemsPromise(req).then(console.log).catch(console.log);
