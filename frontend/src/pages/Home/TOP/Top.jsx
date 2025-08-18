import React, { useState } from 'react';
import './Top.css';

function Top() {
  const [selectedLang, setSelectedLang] = useState('');
  const [streak, setStreak] = useState(0);

  const handleSelect = () => setSelectedLang('C++');
  const incrementStreak = () => setStreak(prev => prev + 1);

  return (
    <div className="topheader">
      <div className="lang-section">
        {selectedLang === '' ? (
          <button className="lang-btn" onClick={handleSelect}>
            Select Language
          </button>
        ) : (
          <span className="selected-lang">
            Selected Language: {selectedLang}
          </span>
        )}
      </div>

      <div className="streak-section">
        <span role="img" aria-label="fire" className="fire-emoji">🔥</span>
        <span className="streak-text">Streak: {streak}</span>
        <button className="solve-btn" onClick={incrementStreak}>
          Solve Today
        </button>
      </div>
    </div>
  );
}

export default Top;
