const mongoose = require('mongoose');

/**
 * Initializes connection to the MongoDB using environment variables.
 * Exports the connected mongoose instance for use in models and services.
 */
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URL || !MONGODB_DB) {
  throw new Error('Database configuration missing. Please set MONGODB_URL and MONGODB_DB in your environment.');
}

const connectDB = async () => {
  // PUBLIC_INTERFACE
  /** Connect to MongoDB */
  try {
    await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };
