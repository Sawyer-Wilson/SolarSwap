import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

// render App container in root div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
