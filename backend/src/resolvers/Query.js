const { forwardTo } = require('prisma-binding');

const Query = {
  me(parent, args, context, info) {
    const { userId } = context.request;
    if (!userId) {
      return null;
    }
    return context.db.query.user(
      {
        where: { id: userId },
      },
      info
    );
  },

  async domains(parent, args, context, info) {
    const { userId } = context.request;
    if (!userId) {
      throw new Error('You must be logged in');
    }
    const user = await context.db.query.user(
      {
        where: {
          id: userId,
        },
      },
      `{ domains { id, hostname } }`
    );
    return user.domains;
  },
  domain: forwardTo('db'),

  pages: forwardTo('db'),
  page: forwardTo('db'),

  links: forwardTo('db'),
  link: forwardTo('db'),

  products: forwardTo('db'),
  product: forwardTo('db'),
};

module.exports = Query;
