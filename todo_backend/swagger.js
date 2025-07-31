const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do Tracker Backend API',
      version: '1.0.0',
      description: 'Backend API for fullstack to-do tracker with authentication, tasks management, categorization, reminders.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'password', 'email'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string', format: 'email' },
          }
        },
        Task: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            dueDate: { type: 'string', format: 'date-time' },
            completed: { type: 'boolean' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
