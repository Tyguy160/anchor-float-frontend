const cheerio = require('cheerio');

function parseMarkup(markup) {
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

function parseHref(href) {
  const url = new URL(href);
  const { hostname, pathname, protocol, hash } = url;
  const params = new Map(url.searchParams);
  return { hostname, pathname, protocol, hash, params };
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
