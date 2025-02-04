// Backend: routes/rooms.js
const express = require('express');
const router = express.Router();

// Szoba létrehozása
router.post('/create', async (req, res) => {
    const { userID } = req.body;

    if (!userID) {
        return res.status(400).json({ error: 'Felhasználói azonosító szükséges!' });
    }

    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
        const [result] = await req.db.execute(
            'INSERT INTO Rooms (RoomCode, CreatedBy) VALUES (?, ?)',
            [roomCode, userID]
        );
        res.status(201).json({ message: 'Szoba sikeresen létrehozva!', roomCode });
    } catch (error) {
        console.error('Hiba szoba létrehozásakor:', error.message);
        res.status(500).json({ error: 'Szoba létrehozása sikertelen.' });
    }
});

// Szobához csatlakozás
router.post('/join', async (req, res) => {
    const { roomCode, userID } = req.body;

    if (!roomCode || !userID) {
        return res.status(400).json({ error: 'RoomCode és UserID szükséges!' });
    }

    try {
        const [rooms] = await req.db.execute('SELECT RoomID FROM Rooms WHERE RoomCode = ?', [roomCode]);

        if (rooms.length === 0) {
            return res.status(404).json({ error: 'Szoba nem található!' });
        }

        const roomID = rooms[0].RoomID;

        await req.db.execute('INSERT INTO RoomUsers (RoomID, UserID) VALUES (?, ?)', [roomID, userID]);

        res.status(200).json({ message: 'Sikeresen csatlakoztál a szobához!', roomID });
    } catch (error) {
        console.error('Hiba szobához való csatlakozáskor:', error.message);
        res.status(500).json({ error: 'Csatlakozás sikertelen.' });
    }
});

module.exports = router;
