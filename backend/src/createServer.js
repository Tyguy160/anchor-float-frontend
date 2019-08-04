const { ApolloServer } = require('apollo-server');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');
const typeDefs = require('./schema');

const resolvers = { Mutation, Query };

const jwt = require('jsonwebtoken');

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.APP_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

async function createServer() {
  await db.connect();
  return new ApolloServer({
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const tokenWithBearer = req.headers.authorization || '';
      const token = tokenWithBearer.split(' ')[1];
      const user = getUser(token);

      return {
        user,
        db,
      };
    },
  });
}

// // Create ApolloServer
// async function createServer() {
//   await db.connect();

//   return new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => ({
//       req,
//       db,
//     }),
//   });
// }

module.exports = createServer;
