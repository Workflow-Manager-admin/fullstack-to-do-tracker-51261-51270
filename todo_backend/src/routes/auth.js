const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * Auth endpoints
 */
router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router;
