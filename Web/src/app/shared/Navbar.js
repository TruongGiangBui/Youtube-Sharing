import React, { Component, useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FaBell, FaUser } from "react-icons/fa";
import ComponentClickOutSide from "./ComponentClickOutSide"
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import { MdLogout } from "react-icons/md";
import { socket } from '../../socket';
import callApi from '../utils/Restful';
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotify: false,
      showUser: false,
      user: {},
      notifications: [],
    }
  }
  async componentDidMount() {
    function onConnect() {
      console.log("Connected")
    }
    function onDisconnect() {
      console.log("Disconnected")
    }
    socket.on('connect', onConnect);
    socket.on('notification', this.loadNotification.bind(this));
    socket.on('disconnect', onDisconnect);
    let res = await callApi('/api/auth/userInfo', 'GET', {})
    if (res.status == 200) {
      this.setState({
        user: res.data.data
      })
    } else {
      if (window.location != '/user/login' || window.location != '/user/register') {
        this.props.history.push('/user/login');
      }
    }
    this.loadNotification()
  }
  async loadNotification() {
    let res = await callApi('/api/post/notifications', 'GET', {})
    if (res.status == 200) {
      console.log(res)
      this.setState({
        notifications: res.data.data
      })
    }
  }
  closeNotify() {
    this.setState({
      showNotify: false
    })
  }
  openUser() {
    this.setState({
      showUser: true
    })
  }
  closeUser() {
    this.setState({
      showUser: false
    })
  }
  openNotify() {
    this.setState({
      showNotify: true
    })
  }
  logout() {
    localStorage.removeItem('accessToken-yts')
    this.props.history.push('/user/login');
  }
  render() {
    return (
      <nav className="navbar">

        <div className='navbar-right'>
          <div style={{ marginLeft: "10px" }}>

            <div className='notify-icon-box'>
              <FaUser onClick={this.openUser.bind(this)} className='notify-icon' />
            </div>
            {this.state.showUser &&
              <ComponentClickOutSide
                style={{ position: "relative" }}
                handleClickOutside={this.closeUser.bind(this)}
              >
                <div className='notify-container customScrollbar-vertical' style={{ width: "300px" }}>
                  <div className='col-md-12 notify-header' style={{ fontSize: "18px" }}>
                    Hello {this.state.user.email}
                  </div>
                  <div className='logout-container'>

                    <div onClick={this.logout.bind(this)} className="btn btn-post">
                      <MdLogout /> Logout</div>
                  </div>
                </div>
              </ComponentClickOutSide>}
          </div>
          <div>

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
                  {this.state.notifications.map(notify => {
                    return <div className='notify-item'>

                      <img className='notify-thumnail' src={notify.thumbnail}></img>

                      <div className='notify-item-text'>
                        <div className='time'>{moment(notify.updatedAt).format('HH:MM')}</div>
                        <div className='user'>{notify.email} shared a video</div>
                        <div className='title'>{notify.title}</div>
                      </div>
                    </div>
                  })}

                </div>
              </ComponentClickOutSide>}
          </div>
        </div>


      </nav>
    );
  }
}

export default withRouter(Navbar)