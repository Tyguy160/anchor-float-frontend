const cheerio = require("cheerio");

function parseMarkup(markup) {
  const $ = cheerio.load(markup);
  const links = $('a[href!=""]:not([href^=#])')
    .map(function() {
      const node = $(this);
      return {
        href: node.attr("href"),
        text: node.text().trim(),
        rel: node.attr("rel") || null,
        title: node.attr("title") || null
      };
    })
    .toArray();
  return links;
}

function parseHref(href) {
  const url = new URL(href);
  const { hostname, pathname, protocol, hash } = url;
  const params = new Map(url.searchParams);
  return { hostname, pathname, protocol, hash, params };
}

module.exports = { parseMarkup, parseHref };
