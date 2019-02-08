const Sitemapper = require('sitemapper');

async function sitemapParseProcessor(job) {
  try {
    const { sitemapUrl } = job.data;

    if (!sitemapUrl.endsWith('.xml')) {
      throw new Error('Sitemap URL must end in `.xml`');
    }

    const sitemap = new Sitemapper();
    const sites = await sitemap.fetch(sitemapUrl);

    console.log(sites);

    return Promise.resolve(sites);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

module.exports = sitemapParseProcessor;
