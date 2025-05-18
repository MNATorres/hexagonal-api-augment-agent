/**
 * Product entity representing a product in our system
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated UUID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was last updated
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
