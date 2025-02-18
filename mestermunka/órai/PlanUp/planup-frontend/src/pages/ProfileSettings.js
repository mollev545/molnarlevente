import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Profile.css';

function Profile({ apiUrl, userId }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const updateProfile = async () => {
    try {
      const response = await axios.put(`${apiUrl}/profile/update`, {
        userId,
        oldPassword,
        newPassword,
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Hiba történt a frissítés során.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profil beállítások</h2>
      {message && <div className="message-box">{message}</div>}
      <input
        type="password"
        placeholder="Régi jelszó"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="profile-input"
      />
      <input
        type="password"
        placeholder="Új jelszó"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="profile-input"
      />
      <input
        type="email"
        placeholder="Új email cím"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="profile-input"
      />
      <button onClick={updateProfile} className="update-button">Frissítés</button>
    </div>
  );
}

export default Profile;
