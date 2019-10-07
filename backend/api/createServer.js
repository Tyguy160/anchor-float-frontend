const { ApolloServer } = require('apollo-server-express');

const { getDB } = require('../prisma/db');
const typeDefs = require('./schema');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { populateUser } = require('./user');

const sleep = sleepTime => new Promise(resolve => setTimeout(resolve, sleepTime));

const resolvers = { Mutation, Query };

async function createServer() {
  let connected;
  let db;
  while (!connected) {
    try {
      db = getDB();
      await db.connect(); // eslint-disable-line no-await-in-loop
      connected = true;
    } catch (err) {
      console.error(err);
      console.error('Failed to connect to DB. Retrying...');
      await sleep(2000); // eslint-disable-line no-await-in-loop
    }
  }

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const user = populateUser(req);
      return {
        user,
        db,
        req,
        res,
      };
    },
  });
}

module.exports = createServer;
