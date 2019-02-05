const cheerio = require('cheerio');

function parseMarkup(markup) {
  if (!markup) {
    throw new Error('Please provide markup to parse');
  }
  const $ = cheerio.load(markup);
  const pageTitle = $('title').text();
  const links = $('a[href!=""]:not([href^=#])')
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

module.exports = { parseMarkup, parseHref, countWords };
