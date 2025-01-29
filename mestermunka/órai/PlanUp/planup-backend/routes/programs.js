const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Programok lekérdezése
router.get('/', async (req, res) => {
  try {
    const [programs] = await req.db.execute('SELECT * FROM Programs');
    res.status(200).json(programs);
  } catch (error) {
    console.error('Hiba történt a programok lekérdezése során:', error.message);
    res.status(500).json({ error: 'Hiba történt a programok lekérdezése során.' });
  }
});

// Véletlenszerű program lekérdezése
router.get('/random', async (req, res) => {
  try {
    const [program] = await req.db.execute('SELECT * FROM Programs ORDER BY RAND() LIMIT 1');
    res.status(200).json(program[0] || {});
  } catch (error) {
    console.error('Hiba történt egy véletlenszerű program lekérdezése során:', error.message);
    res.status(500).json({ error: 'Hiba történt egy véletlenszerű program lekérdezése során.' });
  }
});

module.exports = router;
