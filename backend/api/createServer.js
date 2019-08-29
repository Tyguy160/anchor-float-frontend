const { ApolloServer } = require('apollo-server-express');

const { db } = require('../prisma/db');
const typeDefs = require('./schema');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { populateUser } = require('./user');

const sleep = sleepTime => new Promise(resolve => setTimeout(resolve, sleepTime));

const resolvers = { Mutation, Query };

async function createServer() {
  let connected;
  while (!connected) {
    try {
      await db.connect();
      connected = true;
    } catch (err) {
      console.error(err);
      console.log('Failed to connect. Retrying...');
      await sleep(2000);
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
