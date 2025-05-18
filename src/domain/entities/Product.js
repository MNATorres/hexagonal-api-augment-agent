/**
 * Product entity representing a product in our system
 */
class Product {
  constructor(id, name, price, description, createdAt = null, updatedAt = null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.price !== undefined) this.price = data.price;
    if (data.description !== undefined) this.description = data.description;
    this.updatedAt = new Date();
  }
}

module.exports = Product;
