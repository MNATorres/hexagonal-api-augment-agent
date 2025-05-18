const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Create a MySQL connection pool
 * @returns {Promise<Object>} MySQL connection pool
 */
async function createPool() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test the connection
    const connection = await pool.getConnection();
    console.log('MySQL connection established successfully');
    connection.release();

    return pool;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    throw error;
  }
}

module.exports = { createPool };
