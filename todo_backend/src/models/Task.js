const { mongoose } = require('../db');

const TaskSchema = new mongoose.Schema({
  // PUBLIC_INTERFACE
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  description: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // PUBLIC_INTERFACE
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
