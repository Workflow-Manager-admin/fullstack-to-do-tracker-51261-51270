const { authenticateJWT } = require('./auth');

// Export middleware for extensibility
module.exports = {
  authenticateJWT,
};
