const { v4: uuidv4 } = require('uuid');
const ProductRepository = require('../../domain/repositories/ProductRepository');

/**
 * In-memory implementation of the ProductRepository
 */
class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super();
    this.products = new Map();

    // Add default products
    this.addDefaultProducts();
  }

  /**
   * Initialize the repository with default products
   * This method can be called to ensure default products are loaded
   * @returns {Promise<void>}
   */
  async initialize() {
    // If the repository is empty, add default products
    if (this.products.size === 0) {
      await this.addDefaultProductsSync();
    }
    return;
  }

  /**
   * Find all products
   * @returns {Promise<Array>} Array of products
   */
  async findAll() {
    return Array.from(this.products.values());
  }

  /**
   * Find product by id
   * @param {string} id Product id
   * @returns {Promise<Object|null>} Product or null if not found
   */
  async findById(id) {
    return this.products.get(id) || null;
  }

  /**
   * Create a new product
   * @param {Object} product Product data
   * @returns {Promise<Object>} Created product
   */
  async create(product) {
    // Generate ID if not provided
    if (!product.id) {
      product.id = uuidv4();
    }

    this.products.set(product.id, product);
    return product;
  }

  /**
   * Update an existing product
   * @param {string} id Product id
   * @param {Object} data Updated product data
   * @returns {Promise<Object|null>} Updated product or null if not found
   */
  async update(id, data) {
    const product = this.products.get(id);

    if (!product) {
      return null;
    }

    product.update(data);
    this.products.set(id, product);

    return product;
  }

  /**
   * Delete a product
   * @param {string} id Product id
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    if (!this.products.has(id)) {
      return false;
    }

    this.products.delete(id);
    return true;
  }

  /**
   * Add some default products to the repository (non-blocking)
   * @private
   */
  addDefaultProducts() {
    const Product = require('../../domain/entities/Product');
    const defaultProducts = [
      { name: 'Laptop', price: 999.99, description: 'High performance laptop' },
      { name: 'Smartphone', price: 499.99, description: 'Latest model smartphone' },
      { name: 'Headphones', price: 99.99, description: 'Noise cancelling headphones' },
      { name: 'Monitor', price: 299.99, description: '27-inch 4K monitor' }
    ];

    // Use Promise.all to ensure all products are created
    Promise.all(
      defaultProducts.map(async (productData) => {
        const product = new Product(
          null,
          productData.name,
          productData.price,
          productData.description
        );
        return await this.create(product);
      })
    ).catch(error => {
      console.error('Error adding default products:', error);
    });
  }

  /**
   * Add default products synchronously (blocking)
   * @private
   * @returns {Promise<void>}
   */
  async addDefaultProductsSync() {
    const Product = require('../../domain/entities/Product');
    const defaultProducts = [
      { name: 'Laptop', price: 999.99, description: 'High performance laptop' },
      { name: 'Smartphone', price: 499.99, description: 'Latest model smartphone' },
      { name: 'Headphones', price: 99.99, description: 'Noise cancelling headphones' },
      { name: 'Monitor', price: 299.99, description: '27-inch 4K monitor' }
    ];

    // Process each product sequentially to ensure they are all created
    for (const productData of defaultProducts) {
      const product = new Product(
        null,
        productData.name,
        productData.price,
        productData.description
      );
      await this.create(product);
    }
  }
}

module.exports = InMemoryProductRepository;

