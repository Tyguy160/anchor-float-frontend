const { amzApi } = require('../request');

describe('amzApi', () => {
  const amz = amzApi({
    associateTag: 'triplebar-20',
    awsAccessKey: 'AKIAJEGKAA3435XIBHOA',
    secretKey: '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',
  });

  test('returns if correctly configured', () => {
    expect(typeof amz).toBe('object');
    expect(typeof amz.getUrl).toBe('function');
  });

  test('get url returns a string', () => {
    const url = amz.getUrl(['B006MLQHRG', 'B00YEYKNUK']);
    expect(typeof url).toBe('string');
  });

  test('throws if no asins are passed', () => {
    expect(() => amz.getUrl([])).toThrow();
  });
});
