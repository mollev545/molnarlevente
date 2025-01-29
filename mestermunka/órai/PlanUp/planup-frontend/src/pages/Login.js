import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css'; // A hozzá tartozó CSS fájl (külön kezelhető)

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Kérlek töltsd ki az összes mezőt!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sikeres bejelentkezés esetén
        navigate('/home'); // Átirányítás a főoldalra
      } else {
        // Hibakezelés
        setError(data.message || 'Hiba történt a bejelentkezés során.');
      }
    } catch (err) {
      setError('Nem sikerült csatlakozni a szerverhez.');
    }
  };

  return (
    <div className="login-container">
      <h1>Bejelentkezés</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-mail cím</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Add meg az e-mail címed"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Jelszó</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Add meg a jelszavad"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Bejelentkezés</button>
      </form>
      <p className="register-link">
        Nincs még fiókod?{' '}
        <span onClick={() => navigate('/registration')} className="link">
          Regisztráció
        </span>
      </p>
    </div>
  );
}
