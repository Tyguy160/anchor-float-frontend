// const chalk = require('chalk');
// const Json2csvParser = require('json2csv').Parser;
// const fs = require('fs');

// // const { getDB } = require('../prisma/db');

// // const db = getDB();

// async function getData(hostnameInput) {
//   const numResults = 100;
//   let index = 0;
//   let moreResults = true;
//   try {
//     let data = [];
//     let newData;
//     while (moreResults) {
//       newData = await db.query.domains(
//         {
//           where: {
//             hostname: hostnameInput,
//           },
//         },
//         `{
//           id
//           hostname
//           pages (first: ${numResults}, skip: ${index}) {
//             id
//             url
//             pageTitle
//             wordCount
//             links {
//               id
//               url
//               anchorText
//               affiliateTagged
//               affiliateTagName
//               product {
//                 id
//                 asin
//                 name
//                 availability
//               }
//             }
//           }
//         }`,
//       );

//       if (newData) {
//         // If data has information in it, add to it; otherwise, create data
//         data[0] ? data[0].pages.push(...newData[0].pages) : (data = newData);
//         console.log(`Parsing results page ${index / numResults + 1}`);

//         // On the last set of results
//         if (newData[0].pages.length < numResults) {
//           moreResults = false;
//           console.log(`${chalk.bold.green('Success: ')}Pulled in data from database`);
//         }
//         // Continuing through the list
//         else {
//           index += newData[0].pages.length;
//         }
//       }
//       // No response, break the loop
//       else {
//         moreResults = false;
//         console.log(data);
//       }
//     }

//     if (data.length) {
//       // Determine hostname
//       const { hostname } = data[0];

//       console.log(`\nGetting data for ${chalk.blue.bold(hostname)}`);

//       console.log('\n******************* Site Summary *******************\n');

//       console.log(chalk.bold('Page Statistics'));
//       // Display page count
//       const pageCount = data[0].pages.length;
//       console.log(`Total pages: ${chalk.blue.bold(pageCount)}`);

//       // Display total word count
//       const totalWordCount = data[0].pages
//         .map(page => page.wordCount)
//         .reduce((acc, curr) => acc + curr);
//       console.log(`Total word count: ${chalk.blue.bold(totalWordCount)}`);

//       // Display average word count per page
//       const averageWordCount = (totalWordCount / pageCount).toFixed(1);
//       console.log(`Average words per page: ${chalk.blue.bold(averageWordCount)}`);

//       console.log(chalk.bold('\nLink Statistics'));
//       // Display number of links
//       const totalLinks = data[0].pages
//         .map(page => page.links.length)
//         .reduce((acc, curr) => acc + curr);
//       console.log(`Total links: ${chalk.blue.bold(totalLinks)}`);

//       // Display number of affiliate links
//       const affiliateLinks = data[0].pages
//         .map(page => page.links.filter(link => link.affiliateTagged).length)
//         .reduce((acc, curr) => acc + curr);
//       console.log(`Affiliate links: ${chalk.blue.bold(affiliateLinks)}`);

//       // Display number of available products
//       const availableProducts = data[0].pages
//         .map(
//           page => page.links.filter(link => (link.product ? link.product.availability === 'AMAZON' : ''))
//             .length,
//         )
//         .reduce((acc, curr) => acc + curr);
//       console.log(`Available product links: ${chalk.green.bold(availableProducts)}`);

//       // TODO: Display number of third party products
//       const thirdPartyProducts = data[0].pages
//         .map(
//           page => page.links.filter(link => (link.product ? link.product.availability === 'THIRDPARTY' : '')).length,
//         )
//         .reduce((acc, curr) => acc + curr);
//       console.log(`3rd party product links: ${chalk.yellow.bold(thirdPartyProducts)}`);

//       // TODO: Display number of unavailable products
//       const unavailableProducts = data[0].pages
//         .map(
//           page => page.links.filter(link => (link.product ? link.product.availability === 'UNAVAILABLE' : '')).length,
//         )
//         .reduce((acc, curr) => acc + curr);
//       console.log(`Unavailable product links: ${chalk.red.bold(unavailableProducts)}`);

//       console.log(chalk.bold('\nPercentages'));

//       // Display percentage of affiliate links
//       const percentAffiliatized = ((affiliateLinks / totalLinks) * 100).toFixed(1);
//       console.log(`Affiliate links / Total links: ${chalk.blue.bold(`${percentAffiliatized}%`)}`);

//       // TODO: Display percentage of available links
//       const percentAvailable = ((availableProducts / affiliateLinks) * 100).toFixed(1);
//       console.log(
//         `Available product links / Affiliate links: ${chalk.green.bold(`${percentAvailable}%`)}`,
//       );

//       // TODO: Display percentage of third party links
//       const percentThirdParty = ((thirdPartyProducts / affiliateLinks) * 100).toFixed(1);
//       console.log(
//         `3rd party product links / Affiliate links: ${chalk.yellow.bold(`${percentThirdParty}%`)}`,
//       );

//       // TODO: Display percentage of unavailable links
//       const percentUnavailable = ((unavailableProducts / affiliateLinks) * 100).toFixed(1);
//       console.log(
//         `Unavailable product links / Affiliate links: ${chalk.red.bold(`${percentUnavailable}%`)}`,
//       );

//       console.log('\n****************************************************\n');

//       const fields = [
//         {
//           label: 'Link URL',
//           value: 'links.url',
//         },
//         {
//           label: 'Anchor Text',
//           value: 'links.anchorText',
//         },
//         {
//           label: 'Page URL',
//           value: 'url',
//         },
//         {
//           label: 'Page Title',
//           value: 'pageTitle',
//         },
//         {
//           label: 'Affiliate Tagged',
//           value: 'links.affiliateTagged',
//         },
//         {
//           label: 'Affiliate Tag Name',
//           value: 'links.affiliateTagName',
//         },
//         {
//           label: 'ASIN',
//           value: 'links.product.asin',
//         },
//         {
//           label: 'Product Name',
//           value: 'links.product.name',
//         },
//         {
//           label: 'Product Availability',
//           value: 'links.product.availability',
//         },
//       ];
//       const parser = new Json2csvParser({ fields, unwind: 'links' });
//       const csv = parser.parse(data[0].pages);
//       fs.writeFile(`${hostname.split('.').filter(str => str !== '.')[1]}.csv`, csv, (err) => {
//         // throws an error, you could also catch it here
//         if (err) throw err;

//         // success case, the file was saved
//         console.log(
//           `${hostname.split('.').filter(str => str !== '.')[1]}.csv saved successfully.\n`,
//         );
//       });

//       const siteData = {
//         hostname,
//         pageCount,
//         totalWordCount,
//         averageWordCount,
//         totalLinks,
//         affiliateLinks,
//         availableProducts,
//         thirdPartyProducts,
//         unavailableProducts,
//         percentAffiliatized,
//         percentAvailable,
//         percentThirdParty,
//         percentUnavailable,
//       };
//       return siteData;
//     }
//     console.log(`No data for hostname containing '${hostnameInput}'`);
//   } catch (err) {
//     console.log(`Error: ${err}`);
//   }
// }

// module.exports.getData = getData;
