const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Szoba létrehozása
router.get('/', async (req, res) => {
  try {
    const [rooms] = await req.db.execute('SELECT * FROM Rooms');
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Hiba történt a szobák lekérdezése során:', error.message);
    res.status(500).json({ error: 'Hiba történt a szobák lekérdezése során.' });
  }
});

// Új szoba létrehozása
router.post('/', async (req, res) => {
  const { roomCode, createdByUserID } = req.body;

  if (!roomCode || !createdByUserID) {
    return res.status(400).json({ error: 'Minden mező kitöltése kötelező!' });
  }

  try {
    await req.db.execute(
      'INSERT INTO Rooms (RoomCode, CreatedByUserID) VALUES (?, ?)',
      [roomCode, createdByUserID]
    );
    res.status(201).json({ message: 'Szoba sikeresen létrehozva.' });
  } catch (error) {
    console.error('Hiba történt a szoba létrehozása során:', error.message);
    res.status(500).json({ error: 'Hiba történt a szoba létrehozása során.' });
  }
});

module.exports = router;