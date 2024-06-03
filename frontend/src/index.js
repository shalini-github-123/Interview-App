import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Router> Wrap your App component with Router */}
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    {/* </Router> */}
  </React.StrictMode>
);
