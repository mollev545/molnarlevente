require('dotenv').config(); // ✅ Környezeti változók betöltése

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'planup',
  port: process.env.DB_PORT || 3307
};
