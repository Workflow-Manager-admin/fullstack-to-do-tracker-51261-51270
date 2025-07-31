const taskService = require('../services/task');

/**
 * TaskController: Handles HTTP endpoints for tasks.
 */
class TaskController {
  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks:
   *   post:
   *     summary: Create new task
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Task'
   *     responses:
   *       201:
   *         description: Task created
   *       400:
   *         description: Bad request
   */
  async create(req, res) {
    try {
      const task = await taskService.createTask(req.user.id, req.body);
      return res.status(201).json({ message: 'Task created', task });
    } catch (err) {
      return res.status(400).json({ message: 'Could not create task', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks:
   *   get:
   *     summary: List tasks (supports filtering/category)
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: category
   *         schema:
   *           type: string
   *         description: Filter by category
   *       - in: query
   *         name: completed
   *         schema:
   *           type: boolean
   *         description: Filter by completion status
   *     responses:
   *       200:
   *         description: List of tasks
   */
  async list(req, res) {
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.completed !== undefined) filters.completed = req.query.completed === 'true';
    try {
      const tasks = await taskService.getTasks(req.user.id, filters);
      return res.status(200).json({ tasks });
    } catch (err) {
      return res.status(500).json({ message: 'Could not fetch tasks', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks/{id}:
   *   get:
   *     summary: Get single task by ID
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Task id
   *     responses:
   *       200:
   *         description: Task found
   *       404:
   *         description: Not found
   */
  async get(req, res) {
    try {
      const task = await taskService.getTaskById(req.user.id, req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json({ task });
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching task', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks/{id}:
   *   put:
   *     summary: Update a task by ID
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Task id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Task'
   *     responses:
   *       200:
   *         description: Task updated
   */
  async update(req, res) {
    try {
      const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json({ message: 'Task updated', task });
    } catch (err) {
      return res.status(500).json({ message: 'Error updating task', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks/{id}:
   *   delete:
   *     summary: Delete a task by ID
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Task id
   *     responses:
   *       200:
   *         description: Task deleted
   */
  async delete(req, res) {
    try {
      const task = await taskService.deleteTask(req.user.id, req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks/categories:
   *   get:
   *     summary: Get distinct categories for user's tasks
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: List of categories
   */
  async categories(req, res) {
    try {
      const categories = await taskService.getCategories(req.user.id);
      return res.status(200).json({ categories });
    } catch (err) {
      return res.status(500).json({ message: 'Error getting categories', error: err.message });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * @swagger
   * /tasks/reminders:
   *   get:
   *     summary: Get tasks with due dates coming soon (next day by default)
   *     tags: [Task]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: days
   *         schema:
   *           type: integer
   *         description: How many days ahead to check for reminders (default 1)
   *     responses:
   *       200:
   *         description: List of tasks due soon
   */
  async reminders(req, res) {
    const days = req.query.days ? parseInt(req.query.days, 10) : 1;
    try {
      const reminders = await taskService.getTasksDueSoon(req.user.id, days);
      return res.status(200).json({ tasks: reminders });
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching reminders', error: err.message });
    }
  }
}

module.exports = new TaskController();
