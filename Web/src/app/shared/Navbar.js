import React, { Component, useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import ComponentClickOutSide from "./ComponentClickOutSide"

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotify: false
    }
  }
  closeNotify() {
    this.setState({
      showNotify: false
    })
  }
  openNotify() {
    this.setState({
      showNotify: true
    })
  }
  render() {
    return (
      <nav className="navbar">

        <div className='navbar-right'>
          <div className='notify-icon-box'>
            <FaBell onClick={this.openNotify.bind(this)} className='notify-icon' />
          </div>
          {this.state.showNotify &&
            <ComponentClickOutSide
              style={{ position: "relative" }}
              handleClickOutside={this.closeNotify.bind(this)}
            >
              <div className='notify-container customScrollbar-vertical'>
                <div className='col-md-12 notify-header'>
                  Notifications
                </div>
                <div className='notify-item'>

                  <img className='notify-thumnail' src="https://i.ytimg.com/vi/ZaI7zkQ8nxA/hqdefault.jpg"></img>

                  <div className='notify-item-text'>
                    <div className='time'>20:30</div>
                    <div className='user'>giangbui@gmail.com shared a video</div>
                    <div>IELTS Speaking Questions and Answers  - Part 3 Topic HEALTH</div>
                  </div>
                </div>
                <div className='notify-item'>

                  <img className='notify-thumnail' src="https://i.ytimg.com/vi/ZaI7zkQ8nxA/hqdefault.jpg"></img>

                  <div className='notify-item-text'>
                    <div className='time'>20:30</div>
                    <div className='user'>giangbui@gmail.com shared a video</div>
                    <div>IELTS Speaking Questions and Answers  - Part 3 Topic HEALTH</div>
                  </div>
                </div>
                <div className='notify-item'>

                  <img className='notify-thumnail' src="https://i.ytimg.com/vi/ZaI7zkQ8nxA/hqdefault.jpg"></img>

                  <div className='notify-item-text'>
                    <div className='time'>20:30</div>
                    <div className='user'>giangbui@gmail.com shared a video</div>
                    <div>IELTS Speaking Questions and Answers  - Part 3 Topic HEALTH</div>
                  </div>
                </div>
                <div className='notify-item'>

                  <img className='notify-thumnail' src="https://i.ytimg.com/vi/ZaI7zkQ8nxA/hqdefault.jpg"></img>

                  <div className='notify-item-text'>
                    <div className='time'>20:30</div>
                    <div className='user'>giangbui@gmail.com shared a video</div>
                    <div>IELTS Speaking Questions and Answers  - Part 3 Topic HEALTH</div>
                  </div>
                </div>
                <div className='notify-item'>

                  <img className='notify-thumnail' src="https://i.ytimg.com/vi/ZaI7zkQ8nxA/hqdefault.jpg"></img>

                  <div className='notify-item-text'>
                    <div className='time'>20:30</div>
                    <div className='user'>giangbui@gmail.com shared a video</div>
                    <div>IELTS Speaking Questions and Answers  - Part 3 Topic HEALTH</div>
                  </div>
                </div>
              </div>
            </ComponentClickOutSide>}

        </div>

      </nav>
    );
  }
}

