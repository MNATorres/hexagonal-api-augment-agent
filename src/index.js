require('dotenv').config();
const setupApp = require('./infrastructure/web/app');
const ProductController = require('./infrastructure/web/controllers/ProductController');
const ProductService = require('./application/services/ProductService');
const RepositoryFactory = require('./infrastructure/factories/RepositoryFactory');

// Initialize repository and start server
async function startServer() {
  try {
    // Create repository based on configuration
    const productRepository = await RepositoryFactory.createProductRepository();

    // Set up dependencies (manual dependency injection)
    const productService = new ProductService(productRepository);
    const productController = new ProductController(productService);

    // Set up Express app
    const app = setupApp(productController);

    // Ensure repository is initialized
    await productRepository.initialize();
    console.log('Product repository initialized successfully');

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Hexagonal Architecture API running on http://localhost:${PORT}`);
      console.log(`Repository type: ${process.env.REPOSITORY_TYPE || 'memory'}`);
      console.log('Available endpoints:');
      console.log('- GET    /api/products');
      console.log('- GET    /api/products/:id');
      console.log('- POST   /api/products');
      console.log('- PUT    /api/products/:id');
      console.log('- DELETE /api/products/:id');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
