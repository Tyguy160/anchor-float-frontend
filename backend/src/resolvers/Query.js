const { forwardTo } = require('prisma-binding');

const Query = {
  me(parent, args, context, info) {
    const { user } = context.request;
    if (!user) {
      return null;
    }
    return context.db.query.user(
      {
        where: { id: user.id },
      },
      info
    );
  },

  async domains(parent, args, context, info) {
    let { user } = context.request;
    let { first } = args;

    if (!user) {
      throw new Error('You must be logged in.');
    }

    if (first <= 0) {
      throw new Error('First argument should be positive');
    }
    user = await context.db.query.user(
      {
        where: {
          id: user.id,
        },
      },
      `{ domains { id, hostname, pages {id, url, pageTitle, wordCount, links {id}} } }`
    );
    if (first) {
      return user.domains.slice(0, first);
    }
    return user.domains;
  },
  domain: forwardTo('db'),

  async pages(parent, args, context, info) {
    let { user } = context.request;

    if (!user) {
      throw new Error('You must be logged in.');
    }

    let { hostname } = args;
    hostname = hostname.toLowerCase();

    user = await context.db.query.user(
      {
        where: {
          id: user.id,
        },
      },
      // TODO: Can't we use the info arg for this?
      `{ domains { id, hostname, pages {id, url, pageTitle, wordCount, links {id}} } }`
    );

    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);

    if (!userHasDomain) {
      throw new Error(`${hostname} is not in your domains list.`);
    }

    return user.domains.find(domain => domain.hostname === hostname).pages;
  },
  page: forwardTo('db'),

  links: forwardTo('db'),
  link: forwardTo('db'),

  products: forwardTo('db'),
  product: forwardTo('db'),
};

module.exports = Query;
