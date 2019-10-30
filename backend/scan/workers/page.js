const axios = require('axios');
const uuid = require('uuid/v4');
const { getDB } = require('../../prisma/db');
const { getDataFromMessage } = require('./utils');
const { parseMarkup, parseHref } = require('../parsers');
const { productProducer } = require('../producers.js');

const db = getDB();

function handleResponseErrors(error) {
  if (error.response) {
    // non-200 range response
    console.log(error.response.status);
    return { responseStatus: error.response.status };
  }
  if (error.request) {
    console.log(error.request);
    throw new Error(error.request);
  } else {
    console.log(error.message);
    throw new Error(error.message);
  }
}

async function parsePageHandler({ Body, MessageId }) {
  const urlStr = getDataFromMessage(Body, 'url');
  if (!urlStr) return;

  // Ensure URL string is a valid URL
  let url;
  try {
    url = new URL(urlStr);
  } catch (err) {
    console.log(`Invalid url: ${urlStr}`);
    return;
  }

  const newOrExistingSite = await db.sites.upsert(
    {
      where: { hostname: url.hostname },
      create: { hostname: url.hostname },
      update: {},
    },
    () => console.log('upserted site'),
  );

  const newOrExistingPage = await db.pages
    .upsert(
      {
        where: { url: url.href },
        create: {
          url: url.href,
          site: {
            connect: {
              id: newOrExistingSite.id,
            },
          },
        },
        update: {
          site: {
            connect: {
              id: newOrExistingSite.id,
            },
          },
        },
      },
      () => console.log('upserted page'),
    )
    .catch(console.log);

  const response = await axios.get(url.href).catch(handleResponseErrors);
  console.log(response.status);
  if (response.responseStatus) {
    // Log the non-200 response, then return
    console.log(response.responseStatus);
    return;
  }

  // Delete existing links before parsing new ones
  await db.links.deleteMany({ where: { page: { id: newOrExistingPage.id } } }, '{ count }', () => console.log('deleted links'));

  console.log('getting page data...');
  const { pageTitle, links, wordCount } = await parseMarkup(response.data);
  console.log(`Page title: ${pageTitle}, links: ${links}, word count: ${wordCount}`);
  const parsedLinks = links.map((link) => {
    const parsedHref = parseHref(link.href, url.origin);
    return { ...link, parsedHref };
  });

  await db.pages.update({
    where: {
      id: newOrExistingPage.id,
    },
    data: {
      wordCount,
      pageTitle,
    },
  });

  for (const link of parsedLinks) {
    await processLink(link, newOrExistingPage);
  }

  async function processLink(link, page) {
    try {
      const {
        isValid, params, hostname, pathname,
      } = link.parsedHref;
      // Doesn't do anything with invalid links
      if (isValid) {
        let affiliateTagged = null;
        let affiliateTagName = null;

        // Handle amzn.to links
        if (hostname.includes('amzn.to')) {
          console.log('Shortlink found, no action taken');
        }

        // Handle amazon.com affiliate tagged links
        if (hostname.includes('amazon.com') && params.has('tag')) {
          affiliateTagged = true;
          affiliateTagName = params.get('tag');
        }

        const newLink = await db.links.create({
          data: {
            page: { connect: { id: page.id } },
            href: link.href,
            affiliateTagged,
            affiliateTagName,
            anchorText: link.text,
          },
        });
        // console.log(`created new link: ${newLink.id}\n`);

        if (hostname.includes('amazon.com')) {
          const asinRegexs = [/\/dp\/([^\?#\/]+)/i, /\/gp\/product\/([^\?#\/]+)/i];
          let captureGroup;
          const hasAsin = asinRegexs.some((regex) => {
            captureGroup = pathname.match(regex);
            return captureGroup;
          });
          if (hasAsin) {
            const asin = captureGroup[1];
            console.log('This product has an ASIN');
            productProducer.send(
              [
                {
                  id: uuid(),
                  body: JSON.stringify({ asin, linkId: newLink.id }),
                },
              ],
              (err) => {
                if (err) console.log(err);
              },
            );
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return url;
}

module.exports = { parsePageHandler };
