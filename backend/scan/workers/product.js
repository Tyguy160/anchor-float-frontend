// async function parseProductHandler({ Body, MessageId }) {
//   try {
//     const asin = getDataFromMessage(Body, 'asin');
//     const linkId = getDataFromMessage(Body, 'linkId');
//     if (!asin) return;

//     const existingProduct = await db.query.product({
//       where: {
//         asin,
//       },
//     });

//     if (existingProduct && existingProduct.availability) {
//       const currentTime = new Date().getTime();
//       const updatedAt = new Date(existingProduct.updatedAt).getTime();
//       const MIN_CONVERSION = 1000 * 60;
//       const minutesSinceUpdate = (currentTime - updatedAt) / MIN_CONVERSION;
//       console.log(`Updated ${asin} ${minutesSinceUpdate.toFixed(1)} mins ago\n`);
//       if (
//         minutesSinceUpdate < 1440
//         && ['AMAZON', 'THIRDPARTY', 'UNAVAILABLE'].some(avail => existingProduct.availability.includes(avail))
//       ) {
//         if (linkId) {
//           await db.mutation.updateLink({
//             where: { id: linkId },
//             data: { product: { connect: { id: existingProduct.id } } },
//           });
//         }
//         console.log(`Skipping... ${existingProduct.availability} when last updated\n`);
//         return;
//       }
//     }

//     let newProduct;
//     try {
//       if (!existingProduct) {
//         newProduct = db.mutation.createProduct({
//           data: {
//             asin,
//           },
//         });
//       }
//     } catch (err) {
//       throw new Error(err.message);
//     }

//     // Get product data from Amazon
//     const productPageUrl = constructProductUrl({ asin });

//     console.log(productPageUrl);

//     const { data, status } = await axios
//       .get(proxy.token + productPageUrl, {
//         proxy,
//         headers: {
//           'User-Agent':
//             'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
//         },
//         resposneType: 'text',
//       })
//       .catch((err) => {
//         console.log(err);
//         if (err.response) {
//           return err.response;
//         }
//         throw new Error(err);
//       });

//     console.log(`Status: ${status}`);

//     if (status === 429 || status === 503 || status === 400 || status === 520 || status === 500) {
//       console.log(`Got res code: ${status}\nRequeued product: ${asin}\n`);
//       throw new Error('Non 200 Amazon response');
//     }
//     if ((status < 200 || status >= 300) && status !== 404) {
//       console.log(`Got res code: ${status} for ${asin}\nNot requeued\n`);
//       return;
//     }

//     const updatedProductData = {};

//     if (status === 404) {
//       updatedProductData.availability = 'UNAVAILABLE';
//       updatedProductData.name = 'Not Found';
//     } else {
//       const productInfo = parseProductPageMarkup(data);
//       console.log(productInfo.availability);
//       updatedProductData.name = productInfo.name || 'Not Found';
//       if (productInfo.availability.toLowerCase().includes('unavailable')) {
//         updatedProductData.availability = 'UNAVAILABLE';
//       } else if (productInfo.availability.toLowerCase().includes('these sellers')) {
//         updatedProductData.availability = 'THIRDPARTY';
//       } else if (
//         productInfo.availability.toLowerCase().includes('in stock')
//         || productInfo.availability.toLowerCase().includes('ships within')
//         || productInfo.availability.toLowerCase().includes('available to ship')
//       ) {
//         updatedProductData.availability = 'AMAZON';
//       }
//     }
//     const updatedProduct = await db.mutation.updateProduct({
//       where: { asin },
//       data: updatedProductData,
//     });
//     console.log(
//       `Updated product ${asin}: ${updatedProductData.availability || 'Unrecognized Amazon Page'}\n`,
//     );

//     // Connect the link if a link ID was passed
//     if (!linkId) {
//       console.log('No link ID passed');
//       return;
//     }

//     await db.mutation.updateLink({
//       where: { id: linkId },
//       data: { product: { connect: { id: updatedProduct.id } } },
//     });
//   } catch (error) {
//     console.log('Caught error');
//     console.log(error);
//     throw new Error('Unhandled error');
//   }
// }

// module.exports = { parseProductHandler };
