const Product = require('../../domain/entities/Product');

/**
 * Service for handling product-related business logic
 */
class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Get all products
   * @returns {Promise<Array>} Array of products
   */
  async getAllProducts() {
    return this.productRepository.findAll();
  }

  /**
   * Get product by id
   * @param {string} id Product id
   * @returns {Promise<Object|null>} Product or null if not found
   */
  async getProductById(id) {
    return this.productRepository.findById(id);
  }

  /**
   * Create a new product
   * @param {Object} productData Product data
   * @returns {Promise<Object>} Created product
   */
  async createProduct(productData) {
    const { id, name, price, description } = productData;
    const product = new Product(id, name, price, description);
    return this.productRepository.create(product);
  }

  /**
   * Update an existing product
   * @param {string} id Product id
   * @param {Object} productData Updated product data
   * @returns {Promise<Object|null>} Updated product or null if not found
   */
  async updateProduct(id, productData) {
    return this.productRepository.update(id, productData);
  }

  /**
   * Delete a product
   * @param {string} id Product id
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteProduct(id) {
    return this.productRepository.delete(id);
  }
}

module.exports = ProductService;
