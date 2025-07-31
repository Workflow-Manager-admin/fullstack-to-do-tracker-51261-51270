const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

connectDB().then(() => {
  const server = app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
}).catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

module.exports = app;
