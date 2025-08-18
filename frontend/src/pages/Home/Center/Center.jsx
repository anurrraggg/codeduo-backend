import React from 'react';
import './Center.css';

function Center() {
  return (
    <div className="center_body">
      <div className="center_card glass">
        <h2 className="center_title">Practice, compete, and level up daily</h2>
        <p className="center_subtitle">Keep your streak, climb the leaderboard, and master your chosen language.</p>
        <div className="cta_row">
          <button className="primary_btn">Start lesson</button>
          <button className="secondary_btn">View leaderboard</button>
        </div>
      </div>
    </div>
  );
}

export default Center;
