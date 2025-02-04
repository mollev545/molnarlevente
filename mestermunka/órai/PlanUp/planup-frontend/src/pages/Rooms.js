import React, { useState } from 'react';
import axios from 'axios';

function Rooms({ apiUrl, userId }) {
    const [roomCode, setRoomCode] = useState('');
    const [createdRoom, setCreatedRoom] = useState('');
    const [joinMessage, setJoinMessage] = useState('');
    const [error, setError] = useState('');

    const createRoom = async () => {
        try {
            const response = await axios.post(`${apiUrl}/rooms/create`, { userID: userId });
            setCreatedRoom(response.data.roomCode);
            setError('');
        } catch (err) {
            setError('Hiba történt a szoba létrehozásakor.');
        }
    };

    const joinRoom = async () => {
        try {
            const response = await axios.post(`${apiUrl}/rooms/join`, { roomCode, userID: userId });
            setJoinMessage(`Sikeresen csatlakoztál a ${roomCode} kódú szobához.`);
            setError('');
        } catch (err) {
            setError('Hiba történt a szobához való csatlakozáskor.');
        }
    };

    return (
        <div className="rooms-container">
            <h1>Szobák</h1>

            <div className="create-room">
                <button onClick={createRoom}>Szoba létrehozása</button>
                {createdRoom && <p>Szoba kód: {createdRoom}</p>}
            </div>

            <div className="join-room">
                <input
                    type="text"
                    placeholder="Szoba kód"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />
                <button onClick={joinRoom}>Csatlakozás</button>
                {joinMessage && <p>{joinMessage}</p>}
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Rooms;
