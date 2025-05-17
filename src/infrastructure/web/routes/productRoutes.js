const express = require('express');

/**
 * Configure product routes
 * @param {Object} productController Product controller instance
 * @returns {Object} Express router
 */
function setupProductRoutes(productController) {
  const router = express.Router();

  // GET /products - Get all products
  router.get('/', (req, res) => productController.getAllProducts(req, res));

  // GET /products/:id - Get product by id
  router.get('/:id', (req, res) => productController.getProductById(req, res));

  // POST /products - Create a new product
  router.post('/', (req, res) => productController.createProduct(req, res));

  // PUT /products/:id - Update a product
  router.put('/:id', (req, res) => productController.updateProduct(req, res));

  // DELETE /products/:id - Delete a product
  router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

  return router;
}

module.exports = setupProductRoutes;
