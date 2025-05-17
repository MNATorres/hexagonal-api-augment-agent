/**
 * Interface for Product repository
 * This is a contract that any product repository implementation must follow
 */
class ProductRepository {
  /**
   * Find all products
   * @returns {Promise<Array>} Array of products
   */
  async findAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Find product by id
   * @param {string} id Product id
   * @returns {Promise<Object|null>} Product or null if not found
   */
  async findById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Create a new product
   * @param {Object} product Product data
   * @returns {Promise<Object>} Created product
   */
  async create(product) {
    throw new Error('Method not implemented');
  }

  /**
   * Update an existing product
   * @param {string} id Product id
   * @param {Object} data Updated product data
   * @returns {Promise<Object|null>} Updated product or null if not found
   */
  async update(id, data) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a product
   * @param {string} id Product id
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = ProductRepository;
