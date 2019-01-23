const cheerio = require("cheerio");

function parseMarkup(markup) {
  const $ = cheerio.load(markup);
  const links = $('a[href!=""]:not([href^=#],[href^="/"])')
    .toArray()
    .map(link => link.attribs);
  return { links };
}

module.exports.parseMarkup = parseMarkup;
