require('dotenv').config({
  path: '.env',
});

const createServer = require('./createServer');

createServer().then((server) => {
  server.listen().then(({ url }) => {
    console.log(url);
  });
});
