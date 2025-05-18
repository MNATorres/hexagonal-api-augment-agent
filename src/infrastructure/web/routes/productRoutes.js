const express = require('express');

/**
 * Configure product routes
 * @param {Object} productController Product controller instance
 * @returns {Object} Express router
 */
function setupProductRoutes(productController) {
  const router = express.Router();

  /**
   * @swagger
   * /api/products:
   *   get:
   *     summary: Get all products
   *     description: Retrieve a list of all products
   *     tags: [Products]
   *     responses:
   *       200:
   *         description: A list of products
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/', (req, res) => productController.getAllProducts(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   get:
   *     summary: Get a product by ID
   *     description: Retrieve a single product by its ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to retrieve
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single product
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.get('/:id', (req, res) => productController.getProductById(req, res));

  /**
   * @swagger
   * /api/products:
   *   post:
   *     summary: Create a new product
   *     description: Create a new product with the provided data
   *     tags: [Products]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - price
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the product
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the product
   *               description:
   *                 type: string
   *                 description: The description of the product
   *     responses:
   *       201:
   *         description: Product created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.post('/', (req, res) => productController.createProduct(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   put:
   *     summary: Update a product
   *     description: Update a product with the provided data
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: The name of the product
   *               price:
   *                 type: number
   *                 format: float
   *                 description: The price of the product
   *               description:
   *                 type: string
   *                 description: The description of the product
   *     responses:
   *       200:
   *         description: Product updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.put('/:id', (req, res) => productController.updateProduct(req, res));

  /**
   * @swagger
   * /api/products/{id}:
   *   delete:
   *     summary: Delete a product
   *     description: Delete a product by its ID
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the product to delete
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Product deleted successfully
   *       404:
   *         description: Product not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.delete('/:id', (req, res) => productController.deleteProduct(req, res));

  return router;
}

module.exports = setupProductRoutes;
