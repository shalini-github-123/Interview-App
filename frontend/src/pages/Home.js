// App.js
import React, { useState } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import HorizontalNavbar from '../components/HorizontalNavbar';
import ContentBody from '../components/ContentBody';
import { HiMenu } from 'react-icons/hi';
import './Home.css';




const Home = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

 

  return (
    <div className="home">
      <div className="container">
      <div className={`vertical-navbar ${isNavbarVisible ? 'visible' : ''}`}>
        <VerticalNavbar />
      </div>
      <div className="horizontal-navbar">
        <div className="menu-icon" onClick={toggleNavbar}>
          <HiMenu />
        </div>
        <HorizontalNavbar />
      </div>
      {!isNavbarVisible && (
          <ContentBody />
      )}
    </div>
    </div>
  );
};

export default Home;
