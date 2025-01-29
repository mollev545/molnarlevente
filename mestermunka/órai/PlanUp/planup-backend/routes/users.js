const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Regisztráció
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    console.error('Hiba a regisztráció során:', error);
    res.status(500).json({ error: 'Hiba történt a regisztráció során.' });
  }
});

// Bejelentkezés
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'A felhasználó nem található.' });
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Helytelen jelszó.' });
    }

    const token = jwt.sign({ id: user.UserID }, 'secret_key', { expiresIn: '1h' });

    res.json({ message: 'Sikeres bejelentkezés!', token });
  } catch (error) {
    console.error('Hiba a bejelentkezés során:', error);
    res.status(500).json({ error: 'Hiba történt a bejelentkezés során.' });
  }
});

module.exports = router;
