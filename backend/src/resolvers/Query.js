const { forwardTo } = require('prisma-binding');

const Query = {
  links: forwardTo('db'),
  link: forwardTo('db'),
};

module.exports = Query;
