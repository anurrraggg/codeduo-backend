import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bottom.css';

function Bottom() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const navigate = useNavigate();

  const toggleProfileOptions = () => {
    setShowProfileOptions(prev => !prev);
  };

  return (
    <div className="bottom_footer glass">
      <button>Home</button>
      <button>Shop</button>
      <button>Leaderboard</button>

      <div className="profile-section">
        <button onClick={toggleProfileOptions} className="profile-btn">
          Profile
        </button>

        {showProfileOptions && (
          <div className="profile-dropdown">
            <button className="dropdown-item" onClick={() => navigate('/profile')}>Profile</button>
            <button className="dropdown-item" onClick={() => navigate('/settings')}>Settings</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bottom;
