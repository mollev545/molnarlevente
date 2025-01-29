import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/ProgramSwipe.css';

function ProgramSwipe({ apiUrl, userId }) {
  const [program, setProgram] = useState(null);
  const [error, setError] = useState('');

  // Véletlenszerű program betöltése
  const fetchRandomProgram = async () => {
    try {
      const response = await axios.get(`${apiUrl}/programs/random`);
      setProgram(response.data);
    } catch (err) {
      setError('Failed to fetch program.');
    }
  };

  useEffect(() => {
    fetchRandomProgram();
  }, [apiUrl]);

  const handleSwipe = async (action) => {
    if (!program) return;

    try {
      await axios.post(`${apiUrl}/programs/${program.ProgramID}/${action}`, { userId });
      fetchRandomProgram(); // Következő program betöltése
    } catch (err) {
      setError('Failed to perform swipe action.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!program) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="program-swipe-container">
      <div className="program-card">
        <h2>{program.Name}</h2>
        <p>{program.Description}</p>
        <p>Helyszín: {program.Location}</p>
        <p>Időtartam: {program.Duration}</p>
        <p>Költség: {program.Cost}</p>
      </div>
      <div className="swipe-buttons">
        <button className="dislike-button" onClick={() => handleSwipe('dislike')}>
          Dislike
        </button>
        <button className="like-button" onClick={() => handleSwipe('like')}>
          Like
        </button>
      </div>
    </div>
  );
}

export default ProgramSwipe;
