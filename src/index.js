import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';
import './styles/home.css';
import './styles/not-found.css';
import './styles/about.css';
import './styles/clients.css';
import './styles/services.css';
import './styles/booking.css';
import './styles/contact.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
