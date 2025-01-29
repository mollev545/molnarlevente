import React, { useState } from 'react';
import axios from 'axios';

function Room() {
  const [roomCode, setRoomCode] = useState('');
  const [userId, setUserId] = useState(''); // Ezt általában a bejelentkezés után kapod
  const [roomId, setRoomId] = useState(null);
  const [error, setError] = useState('');

  const createRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3001/rooms', {
        roomCode,
        createdByUserId: userId,
      });
      setRoomId(response.data.roomId);
    } catch (err) {
      setError('Failed to create room.');
    }
  };

  const joinRoom = async () => {
    try {
      await axios.post('http://localhost:3001/rooms/join', {
        roomId,
        userId,
      });
      alert('Joined room successfully!');
    } catch (err) {
      setError('Failed to join room.');
    }
  };

  return (
    <div>
      <h1>Rooms</h1>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={createRoom}>Create Room</button>
      <button onClick={joinRoom}>Join Room</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Room;
