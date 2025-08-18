import React from 'react';

function Bottom() {
  return (
    <div 
      className="bottom_footer" 
      style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '10px 0', 
        borderTop: '1px solid #ccc',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#f9f9f9'
      }}
    >
      <button>Home</button>
      <button>Shop</button>
      <button>Leaderboard</button>
      <button>Profile</button>
    </div>
  );
}

export default Bottom;
