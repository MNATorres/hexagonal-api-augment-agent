const InMemoryProductRepository = require('../repositories/InMemoryProductRepository');
const MySQLProductRepository = require('../repositories/MySQLProductRepository');
const { createPool } = require('../config/database');

/**
 * Factory for creating repositories based on configuration
 */
class RepositoryFactory {
  /**
   * Create a product repository based on the configuration
   * @returns {Promise<Object>} Repository instance
   */
  static async createProductRepository() {
    const repositoryType = process.env.REPOSITORY_TYPE || 'memory';
    
    switch (repositoryType.toLowerCase()) {
      case 'mysql':
        const dbPool = await createPool();
        return new MySQLProductRepository(dbPool);
      
      case 'memory':
      default:
        return new InMemoryProductRepository();
    }
  }
}

module.exports = RepositoryFactory;
