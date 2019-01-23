const { forwardTo } = require('prisma-binding');

const Query = {
  users: forwardTo('db'),
  user: forwardTo('db'),

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
