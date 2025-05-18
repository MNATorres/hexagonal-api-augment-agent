const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Swagger configuration options
 */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hexagonal Architecture API',
      version: '1.0.0',
      description: 'REST API built with Node.js and Express.js following Hexagonal Architecture principles',
      contact: {
        name: 'API Support',
        url: 'https://github.com/yourusername/hexagonal-api',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated UUID of the product',
              example: '550e8400-e29b-41d4-a716-446655440000',
            },
            name: {
              type: 'string',
              description: 'The name of the product',
              example: 'Premium Headphones',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'The price of the product',
              example: 129.99,
            },
            description: {
              type: 'string',
              description: 'The description of the product',
              example: 'Noise-cancelling wireless headphones with premium sound quality',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the product was created',
              example: '2023-01-01T00:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date and time when the product was last updated',
              example: '2023-01-01T00:00:00.000Z',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Product not found',
            },
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/web/routes/*.js', './src/domain/entities/*.js'],
};

/**
 * Initialize Swagger
 * @returns {Object} Swagger middleware
 */
function setupSwagger(app) {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
  }));
  
  // Serve swagger.json
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('Swagger documentation available at /api-docs');
}

module.exports = setupSwagger;
