require('dotenv').config({
  path: '.env',
});
const express = require('express');

const cookieparser = require('cookie-parser');

const createApolloServer = require('./createServer');

const app = express();

createApolloServer().then((server) => {
  server.applyMiddleware({ app });
  console.log(process.env.PORT);
  app.listen({ port: process.env.PORT }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
