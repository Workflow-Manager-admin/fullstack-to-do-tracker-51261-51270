const { mongoose } = require('../db');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  // PUBLIC_INTERFACE
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// PUBLIC_INTERFACE
/** Compare plaintext password against stored hash */
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
