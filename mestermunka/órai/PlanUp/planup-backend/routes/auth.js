require('dotenv').config(); // ✅ Környezeti változók betöltése
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbConfig = require('../config/dbConfig');
const mysql = require('mysql2/promise');

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
console.log("🔑 Használt JWT Secret Key:", SECRET_KEY);

// Adatbázis kapcsolat
let db;
(async () => {
  db = await mysql.createConnection(dbConfig);
  console.log('✅ Adatbázis kapcsolat létrejött az autentikációhoz!');
})();

// Middleware a token ellenőrzésére
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Nincs jogosultság' });
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Érvénytelen token' });
  }
};


module.exports = router;
