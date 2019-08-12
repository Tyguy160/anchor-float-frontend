const { ApolloServer } = require('apollo-server-express');

const { db } = require('../prisma/db');
const typeDefs = require('./schema');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { populateUser } = require('./user');

const resolvers = { Mutation, Query };

async function createServer() {
  await db.connect();
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
