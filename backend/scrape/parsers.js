const cheerio = require('cheerio');

function parseMarkup(markupString, options = {}) {
  const { contentSelector } = options;

  if (!markupString) {
    throw new Error('No markup was provided');
  }
  if (typeof markupString !== 'string') {
    throw new Error('Provided markup is not a string');
  }
  if (typeof options !== 'object') {
    throw new Error('Options argument should be an object');
  }
  if (contentSelector && typeof contentSelector !== 'string') {
    throw new Error('CSS selector was provided but is not a string');
  }

  const $ = cheerio.load(markupString);
  const pageTitle = $('title').text() || null;
  let content;
  if ($(contentSelector).length) {
    content = $(contentSelector).contents();
  } else {
    content = $('body').contents();
  }
  const str = content.map(function getText() {
    return $(this).text();
  }).get().join(' ');

  const wordCount = str.replace(/\s\s+/g, ' ').split(' ').length;

  // Get links that go somewhere
  const LINK_SELECTOR = 'a[href!=""]:not([href^=#])';
  const links = $(LINK_SELECTOR, content)
    .map(function mapLinkToObject() {
      const node = $(this);
      return {
        href: node.attr('href'),
        text: node.text().trim(),
        rel: node.attr('rel') || null,
        title: node.attr('title') || null,
      };
    })
    .toArray();

  return { links, pageTitle, wordCount };
}

module.exports = { parseMarkup };
