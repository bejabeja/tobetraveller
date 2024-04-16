import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { FiltersProvider } from './context/filters';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FiltersProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FiltersProvider>
    </AuthProvider>
  </React.StrictMode >
);

