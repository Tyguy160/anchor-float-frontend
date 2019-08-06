const jwt = require('jsonwebtoken');

function populateUser(req) {
  const token = req.cookies.token || null;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.APP_SECRET);
      return user;
    } catch (err) {
      return null;
    }
  }
  return null;
}

function getUserTokenFromId(userId) {
  return jwt.sign({ userId }, process.env.APP_SECRET, {
    expiresIn: '30d', // token will expire in 30days
  });
}

module.exports = { populateUser, getUserTokenFromId };
