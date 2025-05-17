const express = require('express');
const bodyParser = require('body-parser');
const setupProductRoutes = require('./routes/productRoutes');

/**
 * Configure Express application
 * @param {Object} productController Product controller instance
 * @returns {Object} Express application
 */
function setupApp(productController) {
  const app = express();

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.use('/api/products', setupProductRoutes(productController));

  // Root route
  app.get('/', (req, res) => {
    res.json({
      message: 'Hexagonal Architecture API',
      endpoints: {
        products: '/api/products'
      }
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Something went wrong!',
      message: err.message
    });
  });

  return app;
}

module.exports = setupApp;
