const Task = require('../models/Task');

/**
 * TaskService: Logic for CRUD/task managing
 */
class TaskService {
  // PUBLIC_INTERFACE
  /** Create a new task for a user */
  async createTask(userId, data) {
    const task = new Task({ ...data, user: userId });
    return await task.save();
  }

  // PUBLIC_INTERFACE
  /** Find all tasks for user, with optional filters */
  async getTasks(userId, filters = {}) {
    const query = { user: userId, ...filters };
    return Task.find(query).sort({ dueDate: 1, createdAt: -1 });
  }

  // PUBLIC_INTERFACE
  /** Get a single task belonging to the user */
  async getTaskById(userId, taskId) {
    return Task.findOne({ _id: taskId, user: userId });
  }

  // PUBLIC_INTERFACE
  /** Update the task for user */
  async updateTask(userId, taskId, updates) {
    return Task.findOneAndUpdate({ _id: taskId, user: userId }, updates, { new: true });
  }

  // PUBLIC_INTERFACE
  /** Delete the task for user */
  async deleteTask(userId, taskId) {
    return Task.findOneAndDelete({ _id: taskId, user: userId });
  }

  // PUBLIC_INTERFACE
  /** Get tasks with due date reminders within given days */
  async getTasksDueSoon(userId, days = 1) {
    const now = new Date();
    const soon = new Date(now);
    soon.setDate(soon.getDate() + days);
    return Task.find({
      user: userId,
      dueDate: { $gte: now, $lte: soon },
      completed: false
    });
  }

  // PUBLIC_INTERFACE
  /** Get task categories for user's tasks */
  async getCategories(userId) {
    return Task.distinct('category', { user: userId });
  }
}

module.exports = new TaskService();
