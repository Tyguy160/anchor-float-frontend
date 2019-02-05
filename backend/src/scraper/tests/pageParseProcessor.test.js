const pageParseProcessor = require('../pageParseProcessor');

describe('pageParseProcessor function', () => {
  const url =
    'https://www.triplebarcoffee.com/equipment/roasting/behmor-1600-plus-review/';
  const job = { data: { url } };
  test('returns an object with the correct data', async () => {
    const result = await pageParseProcessor(job);
    expect(typeof result).toBe('object');
    expect(typeof result.wordCount).toBe('number');
    expect(result.pageTitle).toBe(
      'Behmor 1600 Plus – Our Review - Triple Bar Coffee'
    );
    expect(typeof result.links).toBe('object');
    expect(result.links[0].parsedHref.hostname).toBe('www.triplebarcoffee.com');
  });
});
