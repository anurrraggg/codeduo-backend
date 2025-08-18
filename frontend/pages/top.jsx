import React, { useState } from 'react';
import './Top.css';


function Top() {
  const [selectedLang, setSelectedLang] = useState('');

  const handleSelect = () => {
    setSelectedLang('C++');
  };

  return (
    <div className="topheader" style={{ padding: '10px' }}>
      {selectedLang === '' ? (
        <button onClick={handleSelect}>Select Language</button>
      ) : (
        <div>
          <span>Selected Language: {selectedLang}</span>
        </div>
      )}
    </div>
  );
}

export default Top;
