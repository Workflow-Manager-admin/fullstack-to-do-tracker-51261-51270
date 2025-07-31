const User = require('../models/User');
const { generateToken } = require('../services/auth');

/**
 * Handles authentication-related endpoints: signup and login
 */
class AuthController {
  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: User signup
   *     description: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password, email]
   *             properties:
   *               username:
   *                 type: string
   *                 description: Username of the user
   *               password:
   *                 type: string
   *                 description: Password of the user
   *               email:
   *                 type: string
   *                 description: Email address
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Bad request
   */
  async signup(req, res) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const exists = await User.findOne({ $or: [{ username }, { email }] });
      if (exists) {
        return res.status(400).json({ message: 'User already exists.' });
      }
      const user = new User({ username, password, email });
      await user.save();
      const token = generateToken(user);
      return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error registering user.', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User login
   *     description: Login and receive a JWT for future requests
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [username, password]
   *             properties:
   *               username:
   *                 type: string
   *                 description: Username of the user
   *               password:
   *                 type: string
   *                 description: Password of the user
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Invalid credentials
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }
      const token = generateToken(user);
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (err) {
      return res.status(500).json({ message: 'Error logging in.', error: err.message });
    }
  }
}

module.exports = new AuthController();
