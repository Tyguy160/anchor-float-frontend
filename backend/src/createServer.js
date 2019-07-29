const { ApolloServer } = require('apollo-server');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');
const typeDefs = require('./schema');

// Create ApolloServer
function createServer() {
  return new ApolloServer({
    typeDefs,
    resolvers: {
      Mutation,
      Query,
    },
    context: req => ({
      ...req,
      db,
    }),
  });
}

module.exports = createServer;
