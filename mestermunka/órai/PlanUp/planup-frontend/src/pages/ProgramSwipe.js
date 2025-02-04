import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/ProgramSwipe.css';

function ProgramSwipe({ apiUrl, userId }) {
  const [program, setProgram] = useState(null);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ duration: '', cost: '' });
  const [likedPrograms, setLikedPrograms] = useState(new Set());
  const [filterActive, setFilterActive] = useState(false);

  const magyarIdotartam = {
    half_day: 'Fél napos',
    whole_day: 'Egész napos',
    weekend: 'Egész hétvégés',
  };

  const magyarKoltseg = {
    free: 'Ingyenes',
    paid: 'Fizetős',
  };

  const fetchFilteredProgram = async () => {
    try {
      const response = await axios.get(`${apiUrl}/programs/random`, {
        params: filterActive ? filters : {},
      });
      const fetchedProgram = response.data;

      // Ellenőrzés a kedvelt programok listájával és a szűrőkkel
      if (
        (!likedPrograms.has(fetchedProgram.ProgramID)) &&
        (!filters.duration || fetchedProgram.Duration === filters.duration) &&
        (!filters.cost || fetchedProgram.Cost === filters.cost)
      ) {
        setProgram(fetchedProgram);
      } else {
        fetchFilteredProgram(); // Új program lekérése, ha nem felel meg a feltételeknek
      }
    } catch (err) {
      setError('Nem sikerült betölteni a programot.');
    }
  };

  useEffect(() => {
    fetchFilteredProgram();
  }, [apiUrl, filterActive]);

  const handleSwipe = async (action) => {
    if (!program) return;

    try {
      await axios.post(`${apiUrl}/programs/${program.ProgramID}/${action}`, { userId });
      if (action === 'like') {
        setLikedPrograms((prev) => new Set(prev).add(program.ProgramID));
      }
      fetchFilteredProgram();
    } catch (err) {
      setError('Nem sikerült végrehajtani a műveletet.');
    }
  };

  return (
    <div className="program-swipe-container">
      <div className="filters">
        <select
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
        >
          <option value="">Összes időtartam</option>
          {Object.entries(magyarIdotartam).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>

        <select
          value={filters.cost}
          onChange={(e) => setFilters({ ...filters, cost: e.target.value })}
        >
          <option value="">Összes költség</option>
          {Object.entries(magyarKoltseg).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        
        <button onClick={() => setFilterActive(!filterActive)}>
          {filterActive ? 'Szűrő kikapcsolása' : 'Szűrő alkalmazása'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {!program && <div className="loading">Betöltés...</div>}

      {program && (
        <div className="program-card">
          <img
            src={`/images/${program.Image}`}
            alt={program.Name}
            className="program-image"
          />
          <h2>{program.Name}</h2>
          <p>{program.Description}</p>
          <p>Helyszín: {program.Location}</p>
          <p>Időtartam: {magyarIdotartam[program.Duration] || program.Duration}</p>
          <p>Költség: {magyarKoltseg[program.Cost] || program.Cost}</p>
        </div>
      )}
      <div class="ads-container">
  <img src="https://via.placeholder.com/150x300?text=Ad+1" alt="Ad 1" />
  <img src="https://via.placeholder.com/150x300?text=Ad+2" alt="Ad 2" />
  <img src="https://via.placeholder.com/150x300?text=Ad+3" alt="Ad 3" />
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
