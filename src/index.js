const setupApp = require('./infrastructure/web/app');
const ProductController = require('./infrastructure/web/controllers/ProductController');
const ProductService = require('./application/services/ProductService');
const InMemoryProductRepository = require('./infrastructure/repositories/InMemoryProductRepository');

// Set up dependencies (manual dependency injection)
const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Set up Express app
const app = setupApp(productController);

// Initialize repository and start server
async function startServer() {
  try {
    // Ensure default products are loaded
    await productRepository.initialize();
    console.log('Product repository initialized with default products');

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Hexagonal Architecture API running on http://localhost:${PORT}`);
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
