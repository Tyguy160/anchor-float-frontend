const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({
  path: '.env',
});

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// Decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      // put the userId onto the req for future requests to access
      req.userId = userId;
    } catch (err) {
      // removes client token if it's invalid
      res.clearCookie('token');
      req.userId = null;
      return next(err);
    }
  }
  next();
});

// Populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) {
    req.user = null;
    return next();
  }
  // otherwise, add the user data to the request
  try {
    const user = await db.query.user(
      { where: { id: req.userId } },
      '{ id, email, name }'
    );
    req.user = user;
  } catch (err) {
    throw new Error('That user no longer exists');
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    console.log(
      `Server is now running on port http://localhost:${details.port}`
    );
  }
);
