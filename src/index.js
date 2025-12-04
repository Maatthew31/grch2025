import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css'; // Используем новый файл
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);