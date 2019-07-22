require('dotenv').config({
  path: '.env',
});

const createServer = require('./createServer');

const server = createServer();

server.listen().then(({ url }) => {
  console.log(url);
});
