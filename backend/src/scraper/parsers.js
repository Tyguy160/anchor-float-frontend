const cheerio = require('cheerio');

function parseMarkup(markup, contentSelector) {
  if (!markup) {
    throw new Error('Please provide markup to parse');
  }
  if (contentSelector && typeof contentSelector !== 'string') {
    throw new Error('CSS selector was provide but is not a string');
  }

  const $ = cheerio.load(markup);
  const pageTitle = $('title').text();
  let content;
  if ($(contentSelector).length) {
    content = $(contentSelector).contents();
  }
  const links = $('a[href!=""]:not([href^=#])', content)
    .map(function() {
      const node = $(this);
      return {
        href: node.attr('href'),
        text: node.text().trim(),
        rel: node.attr('rel') || null,
        title: node.attr('title') || null,
      };
    })
    .toArray();
  return { links, pageTitle };
}

function parseProductPageMarkup(markup) {
  if (!markup) {
    throw new Error('Please provide valid markup to parse');
  }
  const $ = cheerio.load(markup);
  const asin = $('#ASIN').attr('value');
  const name = $('#productTitle')
    .text()
    .trim();
  const availability = $('#availability')
    .text()
    .trim();
  return { asin, availability, name };
}

// Should handle anything that's a valid value to an href attribtue
// href refers to the href attribute on the link, origin should include the protocol and host
function parseHref(href, origin) {
  const jsHref = /^javascript/;
  const hashStartHref = /^#/;
  const noProtocolHref = /^\/\/.*/;
  const relativeHref = /^\//;

  let url, isValid;

  if (jsHref.test(href) || hashStartHref.test(href)) {
    isValid = false;
    return { isValid };
  } else if (noProtocolHref.test(href)) {
    hrefWithProtocol = `http:${href}`;
    isValid = true;
    url = new URL(hrefWithProtocol);
  } else if (relativeHref.test(href)) {
    isValid = true;
    url = new URL(href, origin);
  } else {
    isValid = true;
    url = new URL(href);
  }
  const { hostname, pathname, protocol, hash } = url;
  const params = new Map(url.searchParams);
  return { isValid, hostname, pathname, protocol, hash, params };
}

function countWords({ markup, contentSelector }) {
  contentSelector = contentSelector || 'body';
  const $ = cheerio.load(markup);
  const count = $(contentSelector)
    .text()
    .replace(/\n/g, ' ')
    .split(' ')
    .filter(word => word != '').length;
  return count;
}

module.exports = { parseMarkup, parseProductPageMarkup, parseHref, countWords };
