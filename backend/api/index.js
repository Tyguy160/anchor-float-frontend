require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const createApolloServer = require('./createServer');

const app = express();
app.use(cookieParser());

createApolloServer().then((server) => {
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  // eslint-disable-next-line no-console
  app.listen({ port: process.env.PORT || 4000 }, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`));
});
