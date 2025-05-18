-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default products
INSERT INTO products (id, name, price, description) VALUES
(UUID(), 'Laptop', 999.99, 'High performance laptop'),
(UUID(), 'Smartphone', 499.99, 'Latest model smartphone'),
(UUID(), 'Headphones', 99.99, 'Noise cancelling headphones'),
(UUID(), 'Monitor', 299.99, '27-inch 4K monitor');
