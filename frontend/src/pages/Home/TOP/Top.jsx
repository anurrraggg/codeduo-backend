import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import './Top.css';

const StreakIcon = () => (
  <svg className="streak-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2c.5 2.5-.5 4.5-2 6-1.6 1.6-3 3.5-3 5.8 0 3.4 2.8 6.2 6.2 6.2s6.2-2.8 6.2-6.2c0-2.3-1.1-4.1-2.5-5.8-.7-.8-1.4-1.6-1.8-2.6-.3-.7-.5-1.6-.4-2.4-1.1.6-2.2 1.5-3 2.5Z" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <path d="M10.3 14.2c.4-1.1 1.7-2.1 2.5-2.9.8.8 1.9 1.8 2.3 2.9.7 1.8-.5 3.6-2.3 3.6-1.8 0-3-1.8-2.5-3.6Z" fill="currentColor"/>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 14.5A8 8 0 1 1 9.5 4c.2 0 .3.3.2.4A6.5 6.5 0 0 0 19.6 14.3c.1.1 0 .4-.2.4-.1 0-.3 0-.4-.2Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
  </svg>
);

function Top() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isHomePage = location.pathname === '/';
  const [selectedLang, setSelectedLang] = useState(() => localStorage.getItem('selectedLang') || 'C++');
  const [streak] = useState(0);
  const [showLangSelector, setShowLangSelector] = useState(false);

  const handleSelect = () => setShowLangSelector(prev => !prev);
  const applyLang = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem('selectedLang', lang);
    setShowLangSelector(false);
  };
  // Streak will update automatically in future when daily problem is solved before midnight IST

  return (
    <div className="topheader glass">
      {!isAuthPage && (
        <div className="lang-section">
          <button className="lang-chip" onClick={handleSelect}>{selectedLang}</button>
          {showLangSelector && (
            <div className="lang-dropdown">
              <button className="dropdown-item" onClick={() => applyLang('C++')}>C++</button>
            </div>
          )}
        </div>
      )}

      {!isAuthPage && (
        <div className="streak-section">
          <StreakIcon />
          <span className="streak-text">Streak: {streak}</span>
          {user && (
            <div className="score-section">
              <span className="score-text">🏆 {user.points || 0} pts</span>
            </div>
          )}
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {!isAuthPage && (
          <>
            {!user && (
              <>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Register</button></Link>
              </>
            )}
            {user && (
              <>
                {!isHomePage && <Link to="/"><button>Home</button></Link>}
                <Link to="/profile"><button>Profile</button></Link>
                <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Top;
