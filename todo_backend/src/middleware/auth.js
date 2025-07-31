const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/auth');

/**
 * Authentication middleware for Express routes.
 * Checks for valid JWT in Authorization header.
 */
// PUBLIC_INTERFACE
function authenticateJWT(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = { authenticateJWT };
