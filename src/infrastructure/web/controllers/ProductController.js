/**
 * Controller for handling product-related HTTP requests
 */
class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  /**
   * Get all products
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get product by id
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create a new product
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing product
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const product = await this.productService.updateProduct(id, productData);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a product
   * @param {Object} req Express request object
   * @param {Object} res Express response object
   */
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
