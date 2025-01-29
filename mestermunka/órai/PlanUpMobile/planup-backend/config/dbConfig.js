const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       // Adatbázis szerver címe
  user: 'root',            // Adatbázis felhasználónév
  password: '',            // Adatbázis jelszó (ha van)
  database: 'planup',      // Az adatbázis neve
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
