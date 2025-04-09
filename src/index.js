import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // 👈 esto es nuevo

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// 👇 activa el service worker para convertir la app en PWA
serviceWorkerRegistration.register();