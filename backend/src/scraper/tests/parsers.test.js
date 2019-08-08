const { parseMarkup, parseHref, countWords } = require('../parsers');
const { markup } = require('./mockSite');

describe('parseMarkup function', () => {
  const result = parseMarkup(markup, 'article.page');
  test('returns an object', () => {
    expect(typeof result).toBe('object');
  });
  test('parses 54 links', () => {
    expect(result.links.length).toBe(30);
  });
  test('parses a title', () => {
    expect(typeof result.pageTitle).toBe('string');
  });
});

describe('parseHref function', () => {
  const href =
    'https://www.amazon.com/Fellow-EKG-Pour-over-Temperature-Stopwatch/dp/B077JBQZPX?psc=1&SubscriptionId=AKIAIPF6TXJESDTZH4HQ&tag=triplebar-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B077JBQZPX';
  const result = parseHref(href);
  test('returns an object', () => {
    expect(typeof result).toBe('object');
  });
  test('returns with the correct hostname', () => {
    expect(result.hostname).toBeDefined();
    expect(result.hostname).toBe('www.amazon.com');
  });
  test('returns a parameters Map that has a `tag` key of the correct value', () => {
    expect(result.params).toBeDefined();
    expect(result.params.has('tag')).toBe(true);
    expect(result.params.get('tag')).toBe('triplebar-20');
  });
});

describe('countWords function', () => {
  const result = countWords({
    markup,
    contentSelector: '.entry-content',
  });
  test('returns a number', () => {
    expect(typeof result).toBe('number');
  });
});
