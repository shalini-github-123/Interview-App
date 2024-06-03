// HorizontalNavbar.js
import React from 'react';
import './HorizontalNavbar.css';

const HorizontalNavbar = () => {
  return (
    <div className="horizontal-navbar">
      <div className="navbar-left">
        <div className="navbar-item">Jobs</div>
      </div>
      <div className="navbar-right">
        <div className="navbar-item">Candidates</div>
      </div>
    </div>
  );
};

export default HorizontalNavbar;
