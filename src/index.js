import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'; // Use HashRouter here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter> {/* Wrap App with HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
