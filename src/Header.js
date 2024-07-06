import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ isDarkMode, toggleDarkMode }) {
  const navigate = useNavigate();

  return (
    <header className="header" style={{ backgroundColor: isDarkMode ? '#333' : '#7BC950' }}>
      <h1 style={{ margin: 0, cursor: 'pointer', color: isDarkMode ? 'white' : 'black' }} onClick={() => navigate('/')}>Code Wallet</h1>
      <div>
        <label style={{ color: isDarkMode ? 'white' : 'black', marginRight: '10px' }}>
          {isDarkMode ? 'Dark Mode' : 'Bright Mode'}
        </label>
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <button onClick={() => navigate('/info')} style={{ marginLeft: '10px' }}>Info</button>
      </div>
    </header>
  );
}

export default Header;