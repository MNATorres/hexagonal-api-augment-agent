# 🤖 Created Completely with Augment Agent
# 🔷 Hexagonal Architecture REST API

<div align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
</div>

## 📋 Overview

A modern REST API built with Node.js and Express.js that follows **Hexagonal Architecture** principles (also known as Ports and Adapters). This project demonstrates how to structure a Node.js application using clean architecture patterns to create maintainable, testable, and scalable code.

### ✨ Features

- **Clean Architecture**: Separation of concerns with domain, application, and infrastructure layers
- **RESTful API**: Full CRUD operations for managing products
- **Flexible Storage Options**:
  - In-memory storage for quick testing and development
  - MySQL database for persistent storage in production
- **Docker Integration**: Easy setup with Docker Compose for the database
- **Well-Documented**: Comprehensive API documentation with Swagger UI
- **Developer-Friendly**: Hot-reloading for development

## 🏛️ Hexagonal Architecture Explained

Hexagonal Architecture (also known as Ports and Adapters) is a software design pattern that allows an application to be equally driven by users, programs, automated tests, or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases.

### Key Components:

- **🧠 Domain Layer**: The core of the application containing business logic and entities
  - Business rules and logic
  - Domain entities
  - Value objects

- **⚙️ Application Layer**: Orchestrates the flow of data to and from the domain
  - Use cases
  - Application services
  - Ports (interfaces)

- **🔌 Infrastructure Layer**: Connects the application to external systems
  - Adapters (implementations of ports)
  - External services integration
  - Web controllers, database repositories, etc.

## 📁 Project Structure

```
├── docker-compose.yml      # Docker Compose configuration
├── init-scripts/           # MySQL initialization scripts
│   └── 01-create-tables.sql # Creates tables and inserts default data
├── .env                    # Environment variables
│
└── src/
    ├── domain/             # Domain layer - core business logic
    │   ├── entities/       # Business entities (Product)
    │   └── repositories/   # Repository interfaces (ports)
    │
    ├── application/        # Application layer - use cases
    │   └── services/       # Application services
    │
    └── infrastructure/     # Infrastructure layer - external interfaces
        ├── config/         # Configuration files
        │   └── database.js # Database connection configuration
        ├── factories/      # Factory classes
        │   └── RepositoryFactory.js # Creates repositories based on config
        ├── repositories/   # Repository implementations (adapters)
        │   ├── InMemoryProductRepository.js # In-memory implementation
        │   └── MySQLProductRepository.js    # MySQL implementation
        └── web/            # Web-related code
            ├── controllers/ # HTTP controllers
            ├── routes/     # Express routes
            └── app.js      # Express application setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker and Docker Compose (for MySQL database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hexagonal-api.git
   cd hexagonal-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the MySQL database with Docker Compose:
   ```bash
   docker-compose up -d
   ```
   This will start a MySQL database on port 3306 and phpMyAdmin on port 8080.

   You can access phpMyAdmin at http://localhost:8080 with these credentials:
   - Server: mysql
   - Username: user
   - Password: password

4. Configure the application:
   The application can use either an in-memory repository or a MySQL repository.
   Edit the `.env` file to configure the repository type:
   ```
   # Use 'memory' or 'mysql'
   REPOSITORY_TYPE=mysql
   ```

5. Start the server:
   ```bash
   npm start
   ```
   The server will start on http://localhost:3000

6. For development with auto-reload:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Swagger UI

The API is documented using Swagger UI, which provides an interactive documentation interface. You can access it at:

```
http://localhost:3000/api-docs
```

This interface allows you to:
- Explore all available endpoints
- Read detailed documentation for each endpoint
- Test API calls directly from the browser
- View request and response schemas

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a product by ID |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## 📝 API Usage Examples

### Create a Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Headphones",
    "price": 129.99,
    "description": "Noise-cancelling wireless headphones with premium sound quality"
  }'
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Premium Headphones",
  "price": 129.99,
  "description": "Noise-cancelling wireless headphones with premium sound quality",
  "createdAt": "2023-04-15T14:30:45.123Z",
  "updatedAt": "2023-04-15T14:30:45.123Z"
}
```

### Get All Products

```bash
curl http://localhost:3000/api/products
```

### Get a Product by ID

```bash
curl http://localhost:3000/api/products/550e8400-e29b-41d4-a716-446655440000
```

### Update a Product

```bash
curl -X PUT http://localhost:3000/api/products/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Headphones Pro",
    "price": 149.99
  }'
```

### Delete a Product

```bash
curl -X DELETE http://localhost:3000/api/products/550e8400-e29b-41d4-a716-446655440000
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 💾 Data Persistence

This application supports two types of data persistence:

### In-Memory Storage

- Data is stored in memory and will be lost when the server restarts
- Useful for development and testing
- No additional setup required
- Configure with `REPOSITORY_TYPE=memory` in the `.env` file

### MySQL Database

- Data is stored in a MySQL database and persists between server restarts
- Suitable for production use
- Requires Docker and Docker Compose for easy setup
- Configure with `REPOSITORY_TYPE=mysql` in the `.env` file
- Database schema and default data are automatically created on first run

## 📚 Learn More

- [Hexagonal Architecture (Alistair Cockburn)](https://alistair.cockburn.us/hexagonal-architecture/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [Swagger Documentation](https://swagger.io/docs/)
- [OpenAPI Specification](https://swagger.io/specification/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
