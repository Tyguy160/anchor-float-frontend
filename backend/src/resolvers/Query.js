const { forwardTo } = require('prisma-binding');

const Query = {
  domains: forwardTo('db'),
  domain: forwardTo('db'),

  pages: forwardTo('db'),
  page: forwardTo('db'),

  links: forwardTo('db'),
  link: forwardTo('db'),

  products: forwardTo('db'),
  product: forwardTo('db'),
};

module.exports = Query;
