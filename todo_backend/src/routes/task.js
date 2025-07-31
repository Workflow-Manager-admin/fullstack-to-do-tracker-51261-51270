const express = require('express');
const taskController = require('../controllers/task');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

// Protect all routes below
router.use(authenticateJWT);

// Task CRUD
router.post('/', taskController.create.bind(taskController));
router.get('/', taskController.list.bind(taskController));
router.get('/categories', taskController.categories.bind(taskController));
router.get('/reminders', taskController.reminders.bind(taskController));
router.get('/:id', taskController.get.bind(taskController));
router.put('/:id', taskController.update.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));

module.exports = router;
