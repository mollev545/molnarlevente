import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/ProgramSwipe.css';

function ProgramSwipe({ apiUrl, userId }) {
  const [program, setProgram] = useState(null);
  const [error, setError] = useState('');

  const magyarIdotartam = {
    half_day: 'Fél napos',
    whole_day: 'Egész napos',
    weekend: 'Egész hétvégés',
  };

  const magyarKoltseg = {
    free: 'Ingyenes',
    paid: 'Fizetős',
  };

  const fetchRandomProgram = async () => {
    try {
      const response = await axios.get(`${apiUrl}/programs/random`);
      setProgram(response.data);
    } catch (err) {
      setError('Nem sikerült betölteni a programot.');
    }
  };

  useEffect(() => {
    fetchRandomProgram();
  }, [apiUrl]);

  const handleSwipe = async (action) => {
    if (!program) return;

    try {
      await axios.post(`${apiUrl}/programs/${program.ProgramID}/${action}`, { userId });
      fetchRandomProgram();
    } catch (err) {
      setError('Nem sikerült végrehajtani a műveletet.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!program) {
    return <div className="loading">Betöltés...</div>;
  }

  return (
    <div className="program-swipe-container">
      <div className="program-card">
      <img
  src={`${process.env.PUBLIC_URL}/images/${program.Image}`}
  alt={program.Name}
  className="program-image"
/>

        <h2>{program.Name}</h2>
        <p>{program.Description}</p>
        <p>Helyszín: {program.Location}</p>
        <p>Időtartam: {magyarIdotartam[program.Duration] || program.Duration}</p>
        <p>Költség: {magyarKoltseg[program.Cost] || program.Cost}</p>
      </div>
      <div className="swipe-buttons">
        <button className="dislike-button" onClick={() => handleSwipe('dislike')}>
          Nem tetszik
        </button>
        <button className="like-button" onClick={() => handleSwipe('like')}>
          Tetszik
        </button>
      </div>
    </div>
  );
}

export default ProgramSwipe;
