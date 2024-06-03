import React, { useState } from "react";
import { FaChevronDown, FaBriefcase, FaCalendarCheck, FaFileAlt, FaThLarge, FaTasks, FaChartLine } from "react-icons/fa";
import { FiFileText, FiVideo, FiClipboard } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';
import "./VerticalNavbar.css"; // Import the CSS file
import logo from "../assets/logo.png"; // Replace with the path to your logo
import userPic from "../assets/userPic.png"; // Replace with the path to your user picture
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const VerticalNavbar = () => {
  const [isUserDropdownVisible, setIsUserDropdownVisible] = useState(false);
  const [isWebsiteDropdownVisible, setIsWebsiteDropdownVisible] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login'); // Ensure navigation to the login page after logout
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownVisible(!isUserDropdownVisible);
  };

  const toggleWebsiteDropdown = () => {
    setIsWebsiteDropdownVisible(!isWebsiteDropdownVisible);
  };

  const getUsername = (email) => {
    return email.split("@")[0];
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="title">
          WEBSITE WIZARDS
          <div className="dropdown">
            <FaChevronDown className="dropdown-icon" onClick={toggleWebsiteDropdown} />
            <div className={`dropdown-content ${isWebsiteDropdownVisible ? "visible" : ""}`}>
              <p>Hello World!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="user-container">
        <img src={userPic} alt="User" className="user-pic" />
        {user && (
          <div className="user-name">
            {getUsername(user.email)}
            <div className="dropdown">
              <FaChevronDown className="dropdown-icon" onClick={toggleUserDropdown} />
              <div className={`dropdown-content ${isUserDropdownVisible ? "visible" : ""}`}>
                <div>
                  <span className="user-email">{user.email}</span>
                  <button onClick={handleClick}>Log out</button>
                  {user.role === "Admin" && (
                    <button><Link to="/add-recruiter" className="add-recruiter-button">Add Recruiter</Link></button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="nav-items">
        <div className="nav-container">
          <div className="nav-title">CANDIDATES</div>
          <div className="nav-item">
            <FaBriefcase className="icon" /> Jobs
          </div>
          <div className="nav-item">
            <FaCalendarCheck className="icon" /> Interviews
          </div>
          <div className="nav-item">
            <FaFileAlt className="icon" /> Responses
          </div>
          <div className="nav-item">
            <FaThLarge className="icon" /> Shortlists
          </div>
        </div>

        <div className="nav-title">CONTENT</div>
        <div className="nav-item">
          <FiFileText className="icon" /> Requests
        </div>
        <div className="nav-item">
          <FiVideo className="icon" /> Videos
        </div>
        <div className="nav-item">
          <FiClipboard className="icon" /> Channels
        </div>
        <div className="nav-item">
          <FaTasks className="icon" /> Projects
        </div>
        <div className="nav-item">
          <FaChartLine className="icon" /> Analytics
        </div>
      </div>
      <div className="todo-container">
        <div>To-do</div>
      </div>
    </div>
  );
};

export default VerticalNavbar;
