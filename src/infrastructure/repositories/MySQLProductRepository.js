const { v4: uuidv4 } = require('uuid');
const ProductRepository = require('../../domain/repositories/ProductRepository');
const Product = require('../../domain/entities/Product');

/**
 * MySQL implementation of the ProductRepository
 */
class MySQLProductRepository extends ProductRepository {
  constructor(dbPool) {
    super();
    this.dbPool = dbPool;
  }

  /**
   * Initialize the repository
   * @returns {Promise<void>}
   */
  async initialize() {
    // Nothing to initialize for MySQL repository
    // The database is already set up with Docker
    return;
  }

  /**
   * Find all products
   * @returns {Promise<Array>} Array of products
   */
  async findAll() {
    try {
      const [rows] = await this.dbPool.query('SELECT * FROM products');
      
      return rows.map(row => new Product(
        row.id,
        row.name,
        parseFloat(row.price),
        row.description,
        new Date(row.created_at),
        new Date(row.updated_at)
      ));
    } catch (error) {
      console.error('Error finding all products:', error);
      throw error;
    }
  }

  /**
   * Find product by id
   * @param {string} id Product id
   * @returns {Promise<Object|null>} Product or null if not found
   */
  async findById(id) {
    try {
      const [rows] = await this.dbPool.query('SELECT * FROM products WHERE id = ?', [id]);
      
      if (rows.length === 0) {
        return null;
      }
      
      const row = rows[0];
      return new Product(
        row.id,
        row.name,
        parseFloat(row.price),
        row.description,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    } catch (error) {
      console.error(`Error finding product with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new product
   * @param {Object} product Product data
   * @returns {Promise<Object>} Created product
   */
  async create(product) {
    try {
      // Generate ID if not provided
      if (!product.id) {
        product.id = uuidv4();
      }
      
      const now = new Date();
      product.createdAt = now;
      product.updatedAt = now;
      
      await this.dbPool.query(
        'INSERT INTO products (id, name, price, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          product.id,
          product.name,
          product.price,
          product.description,
          product.createdAt,
          product.updatedAt
        ]
      );
      
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update an existing product
   * @param {string} id Product id
   * @param {Object} data Updated product data
   * @returns {Promise<Object|null>} Updated product or null if not found
   */
  async update(id, data) {
    try {
      // First check if the product exists
      const product = await this.findById(id);
      
      if (!product) {
        return null;
      }
      
      // Update the product properties
      if (data.name !== undefined) product.name = data.name;
      if (data.price !== undefined) product.price = data.price;
      if (data.description !== undefined) product.description = data.description;
      product.updatedAt = new Date();
      
      // Update in the database
      await this.dbPool.query(
        'UPDATE products SET name = ?, price = ?, description = ?, updated_at = ? WHERE id = ?',
        [
          product.name,
          product.price,
          product.description,
          product.updatedAt,
          id
        ]
      );
      
      return product;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a product
   * @param {string} id Product id
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    try {
      const [result] = await this.dbPool.query('DELETE FROM products WHERE id = ?', [id]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
}

module.exports = MySQLProductRepository;
