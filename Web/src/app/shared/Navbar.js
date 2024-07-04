import React, { Component, useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Navbar() {
 
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    
  }, [notifications]);
  return (
    <nav className="navbar">
      
        
        <ul className="navbar-nav navbar-nav-right">
          
          
          <Dropdown alignRight as="li" className="nav-item border-left">
            <Dropdown.Toggle as="a" className="nav-link count-indicator cursor-pointer">
              <i className="mdi mdi-bell"></i>
              <span className="count bg-danger"></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
              <h6 className="p-3 mb-0">Notifications</h6>
              <Dropdown.Divider />
              {notifications.reverse().map((noti) => {
                console.log("map",noti)
                return <div>
                  <Dropdown.Item className="dropdown-item preview-item" onClick={evt => evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject mb-1">{noti.message}</p>
                      <p className="text-muted ellipsis mb-0">
                        {noti.time}
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                </div>
              })}


              <p className="p-3 mb-0 text-center">See all notifications</p>
            </Dropdown.Menu>
          </Dropdown>
          
        </ul>
    </nav>
  );
}

export default Navbar;
