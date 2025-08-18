import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import './Top.css';

function Top() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
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
        <span  aria-label="fire" className="fire-emoji">🔥</span>
        <span className="streak-text">Streak: {streak}</span>
        <button className="solve-btn" onClick={incrementStreak}>
          Solve Today
        </button>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <Link to="/"><button>Home</button></Link>
        {!user && (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}
        {user && (
          <>
            <Link to="/profile"><button>Profile</button></Link>
            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Top;
