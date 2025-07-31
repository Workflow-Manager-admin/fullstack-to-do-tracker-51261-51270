const jwt = require('jsonwebtoken');

// Should be set in environment!
const JWT_SECRET = process.env.JWT_SECRET || 'devsecretkey';

// PUBLIC_INTERFACE
/**
 * Generate JWT token for a user.
 * @param {Object} user - The user object.
 * @returns {string} - JWT token.
 */
function generateToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' } // 1 week expiry
  );
}

module.exports = { generateToken, JWT_SECRET };
