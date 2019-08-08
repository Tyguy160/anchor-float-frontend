const shortlinkParseProcessor = require('../shortlinkParseProcessor');

describe('shortlinkParseProcessor function', () => {
  const url = 'http://amzn.to/2Evz6xh';
  const linkId = 'dummystring';
  const job = { data: { url, linkId } };
  test('returns an object with the correct data', async () => {
    const result = await shortlinkParseProcessor(job);
    expect(typeof result).toBe('object');
  });
  const invalidUrl = 'https://www.amazon.com/gp/product/B01HNQ315E/';
  const invalidJob = { data: { url: invalidUrl, linkId } };
  test('throws when an invalid url is passed', async () => {
    await expect(shortlinkParseProcessor(invalidJob)).rejects.toThrow();
  });
});
