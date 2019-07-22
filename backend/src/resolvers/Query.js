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
      info,
    );
  },

  async domains(parent, args, context, info) {
    let { user } = context.request;
    const { first } = args;

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
      '{ domains { id, hostname, preferences { id, sitemapUrl, contentSelector}, pages {id, url, pageTitle, wordCount, links {id}} } }',
    );
    if (first) {
      return user.domains.slice(0, first);
    }
    return user.domains;
  },

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
      `{
        domains {
          id
          hostname
          pages {
            id
            url
            pageTitle
            wordCount
            links {
              id
              url
              affiliateTagged
              affiliateTagName
              product {
                id
                asin
                name
                availability
              }
            }
          }
        }
      }
      `,
    );

    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);

    if (!userHasDomain) {
      throw new Error(`${hostname} is not in your domains list.`);
    }

    return user.domains.find(domain => domain.hostname === hostname).pages;
  },
  async preferences(parent, args, context, info) {
    const { user } = context.request;
    if (!user) {
      throw new Error('You must be logged in.');
    }

    const res = await context.db.query.userDomainPreferenceses(
      {
        where: { user: { id: user.id } },
      },
      '{ domain { hostname }, sitemapUrl, contentSelector }',
    );

    return res.map(pref => ({ ...pref, domain: pref.domain.hostname }));
  },
};

module.exports = Query;
