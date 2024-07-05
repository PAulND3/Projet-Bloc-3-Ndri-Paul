import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // Assurez-vous que le fichier CSS est importé ici
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();