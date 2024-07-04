import React, { Component, useState, useEffect, useRef } from 'react';

import { socket } from '../../socket';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



import configData from "../../config.json";
const SERVER_URL = configData.SERVER_URL


function Dashboard(props) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    function onConnect() {
      console.log("Connected Dashboard")
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      <Toaster />

      <div className="proBanner">
        <div>
        </div>
      </div>
      <div className="row ">
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <div className="card">
            <div className="card-body add-post">
              <div className='col-md-12 flex'>
                <div className='col-md-2 '>
                  <img className='add-post-avatar' src="avt.jpeg"></img>
                </div>
                <div className='col-md-10 '>
                  <div className='add-post-input'>Share video</div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body" style={{height:"400px"}}>
    
            </div>
          </div>
          <div className="card">
            <div className="card-body" style={{height:"400px"}}>

            </div>
          </div>
          <div className="card">
            <div className="card-body" style={{height:"400px"}}>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;