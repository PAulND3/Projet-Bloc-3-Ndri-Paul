import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import FragmentList from './FragmentList';
import FragmentForm from './FragmentForm';
import InfoPage from './InfoPage';
import './styles.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<FragmentList />} />
            <Route path="/form" element={<FragmentForm />} />
            <Route path="/info" element={<InfoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;