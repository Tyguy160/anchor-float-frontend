const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { pageParseQueue, sitemapsParseQueue } = require('../scraper/jobQueue');

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

const Mutation = {
  async signUp(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    let user = await context.db.query.user({
      where: {
        email: args.email,
      },
    });
    if (user) {
      throw new Error('An account with that email already exists');
    }
    const password = await bcrypt.hash(args.password, 10);
    delete args.password;
    user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });
    return user;
  },

  async signIn(parent, args, context, info) {
    args.email = args.email.toLowerCase();
    const user = await context.db.query.user({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      throw new Error(`No user found for ${args.email}`);
    }
    const passValid = await bcrypt.compare(args.password, user.password);
    if (!passValid) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: ONE_YEAR,
    });
    return user;
  },

  signOut(parent, args, context, info) {
    context.response.clearCookie('token');
    return { message: 'Signed out' };
  },

  async addDomain(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    // get user but with domains
    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }'
    );

    let { hostname } = args;
    hostname = hostname.toLowerCase();
    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);
    if (userHasDomain) {
      throw new Error(`You've alread added ${hostname}`);
    }

    let domain = await context.db.query.domain({
      where: { hostname },
    });
    if (!domain) {
      domain = await context.db.mutation.createDomain(
        {
          data: {
            ...args,
          },
        },
        info
      );
      const domainPrefs = await context.db.mutation.createUserDomainPreferences(
        {
          data: {
            domain: { connect: { id: domain.id } },
            user: { connect: { id: user.id } },
          },
        },
        `{
          id
          domain {
            id
          }
          user {
            id
          }
        }`
      );
      await context.db.mutation.updateDomain({
        where: { id: domain.id },
        data: { preferences: { connect: [{ id: domainPrefs.id }] } },
      });
    }
    await context.db.mutation.updateUser({
      where: { id: user.id },
      data: {
        domains: {
          connect: [
            {
              id: domain.id,
            },
          ],
        },
      },
    });

    return domain;
  },

  async addPage(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    // refetch user but with domains
    user = await context.db.query.user(
      { where: { id: user.id } },
      '{ id, email, name, domains { id, hostname } }'
    );

    let { url, hostname } = args;
    url = new URL(url.toLowerCase());
    hostname = hostname.toLowerCase();

    const userHasDomain = user.domains
      .map(entry => entry.hostname)
      .includes(hostname);

    if (!userHasDomain) {
      throw new Error(
        `"${hostname}" is not in your domains list. Please add it first.`
      );
    }

    if (url.hostname !== hostname) {
      throw new Error(
        `Domain: "${hostname}" and page: "${url.hostname}" do not match.`
      );
    }

    const urlToSave = url.origin + url.pathname;
    const page = await context.db.mutation.createPage(
      {
        data: {
          url: urlToSave,
        },
      },
      info
    );

    const updatedDomain = await context.db.mutation.updateDomain(
      {
        where: { hostname },
        data: {
          pages: { connect: [{ id: page.id }] },
        },
      },
      `{id hostname preferences { id contentSelector user { id }}}`
    );

    const filteredPreferences = updatedDomain.preferences.filter(
      details => details.user.id === user.id
    );
    const contentSelector = filteredPreferences[0].contentSelector || undefined;

    pageParseQueue.add({
      url: urlToSave,
      pageId: page.id,
      contentSelector,
    });

    return page;
  },
  async addSitemap(parent, args, context, info) {
    const { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    if (!args.url.endsWith('.xml')) {
      throw new Error('URL must link to an XML sitemap (end in .xml)');
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(args.url);
    } catch (err) {
      throw new Error('URL could not be parsed');
    }

    const [domain] = await context.db.query.domains(
      {
        where: {
          AND: [
            { hostname: parsedUrl.hostname },
            { users_some: { id: user.id } },
          ],
        },
      },
      `{ id hostname preferences { id sitemapUrls } }`
    );

    if (!domain) {
      throw new Error(
        `Please add ${
          parsedUrl.hostname
        } to your domains before adding a sitemap.`
      );
    }

    const updatedUrls = new Set(domain.preferences.sitemapUrls);
    if (updatedUrls.has(parsedUrl.href)) {
      throw new Error('Sitemap URL already in preferences');
    }
    updatedUrls.add(parsedUrl.href);

    const updatedPrefs = await context.db.mutation.updateUserDomainPreferences(
      {
        where: { id: domain.preferences.id },
        data: { sitemapUrls: { set: [...updatedUrls] } },
      },
      `{ domain { hostname } }`
    );

    if (!updatedPrefs) {
      throw new Error(`Error updating sitemap list`);
    }

    sitemapsParseQueue.add({
      userId: user.id,
      domainHostname: updatedPrefs.hostname,
    });

    return `Added ${parsedUrl.href} to sitemap list`;
  },
  async addOrUpdateContentSelector(parent, args, context, info) {
    let { user } = context.request;
    if (!user) {
      throw new Error('You must be signed in');
    }

    const domain = await context.db.query.domain(
      { where: { hostname: args.hostname } },
      `{id preferences { id user { id }}}`
    );

    if (!domain) {
      throw new Error(
        `Please add ${
          args.hostname
        } to your domains before adding a CSS selector`
      );
    }

    const filteredPreferences = domain.preferences.filter(
      details => details.user.id === user.id
    );

    if (filteredPreferences.length !== 1) {
      throw new Error('Exisiting preferences not found');
    }

    const updatedPrefs = await context.db.mutation.updateUserDomainPreferences(
      {
        where: { id: filteredPreferences[0].id },
        data: { contentSelector: args.cssSelector },
      },
      `{ domain { hostname }, sitemapUrl, contentSelector }`
    );

    return { ...updatedPrefs, domain: updatedPrefs.domain.hostname };
  },
};

module.exports = Mutation;
