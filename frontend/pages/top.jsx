import React, { useState } from 'react';
import './Top.css';

function Top() {
  const [selectedLang, setSelectedLang] = useState('');
  const [streak, setStreak] = useState(0);

  const handleSelect = () => {
    setSelectedLang('C++');
  };

  // Simulate solving a question to increase streak
  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };

  return (
    <div className="topheader">
      {/* Language Selector Section */}
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

      {/* Streak Display Section */}
      <div className="streak-section">
        <span aria-label="fire" className="fire-emoji">🔥</span>
        <span className="streak-text">Streak: {streak}</span>
        <button className="solve-btn" onClick={incrementStreak}>Solve Today</button>
      </div>
    </div>
  );
}

export default Top;
