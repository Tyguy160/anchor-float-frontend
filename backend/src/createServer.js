const { ApolloServer } = require('apollo-server');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');
const typeDefs = require('./schema');

const resolvers = { Mutation, Query };

// Create ApolloServer
function createServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      req,
      db,
    }),
  });
}

module.exports = createServer;
