import React, { useState } from 'react';
import './Bottom.css';

function Bottom() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setShowProfileOptions(prev => !prev);
  };

  return (
    <div className="bottom_footer">
      <button>Home</button>
      <button>Shop</button>
      <button>Leaderboard</button>

      <div className="profile-section">
        <button onClick={toggleProfileOptions} className="profile-btn">
          Profile
        </button>

        {showProfileOptions && (
          <div className="profile-dropdown">
            <button className="dropdown-item">Profile</button>
            <button className="dropdown-item">Settings</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bottom;
