import React from 'react';
import './ContentBody.css';
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const ContentBody = () => {
  return (
    <div className="content-body">
      <div className="import-search-container">
        <div className="import-container">
          <div className="import-logo"><span>+</span></div>
          import
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="content-columns">
        <div className="content-clm">
          Name
          <div className='arrow-icons'>
            <div className="triangle-up"></div>
            <div className="triangle-down"></div>
          </div>
        </div>
        <div className="content-clm">
          Active
          <div className='arrow-icons'>
            <div className="triangle-up"></div>
            <div className="triangle-down"></div>
          </div>
        </div>
        <div className="content-clm">
          Interview Form
          <div className='arrow-icons'>
            <div className="triangle-up"></div>
            <div className="triangle-down"></div>
          </div>
        </div>
        <div className="content-clm">
          Created
          <div className='arrow-icons'>
            <div className="triangle-up"></div>
            <div className="triangle-down"></div>
          </div>
        </div>
      </div>
      <div className="chat-icon">
        <HiOutlineChatBubbleLeftRight />
      </div>
    </div>
  );
};

export default ContentBody;
