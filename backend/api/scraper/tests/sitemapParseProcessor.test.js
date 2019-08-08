const sitemapParseProcessor = require('../sitemapParseProcessor');

describe('sitemapParseProcessor function', () => {
  const sitemapUrl = 'https://www.triplebarcoffee.com/page-sitemap.xml';
  const job = { data: { sitemapUrl } };
  test('returns an object with the correct data', async () => {
    const result = await sitemapParseProcessor(job);
    expect(typeof result).toBe('object');
  });

  const sitemapUrlBad = 'https://www.triplebarcoffee.com/page-sitemapfdaf.xml';
  const badJob = { data: { sitemapUrl: sitemapUrlBad } };
  test('returns an object a sites length of 0 if the url is invalid', async () => {
    const result = await sitemapParseProcessor(badJob);
    expect(result.sites.length).toBe(0);
  });
});
