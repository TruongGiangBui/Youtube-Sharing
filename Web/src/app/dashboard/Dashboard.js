import React, { Component, useState, useEffect, useRef } from 'react';

import { socket } from '../../socket';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";


import configData from "../../config.json";
const SERVER_URL = configData.SERVER_URL

export class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      inputData: {
        videoUrl: "",
        description: "",
        title: "",
        videoID: "",
      },
      showShareVideo: false
    }
  }
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // useEffect(() => {
  //   function onConnect() {
  //     console.log("Connected Dashboard")
  //     setIsConnected(true);
  //   }
  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, []);
  onChangeValue(type, event) {
    if (event) {
      let value = ""
      if (event.target) {
        value = event.target.value
      } else {
        value = event.value
      }

      this.state.inputData[type] = value

      this.setState({});
    } else {
      this.state.inputData[type] = ''
      this.setState({});
    }
  }
  addPost() {

  }
  reset() {
    this.setState({
      inputData: {
        videoUrl: "",
        description: "",
        title: "",
        videoID: "",
      },
    })
  }
  showShareVideo() {
    this.setState({
      showShareVideo: true
    })
  }
  closeShareVideo() {
    this.setState({
      showShareVideo: false
    })
    this.reset()
  }
  async onBlurUrl() {
    let url = this.state.inputData.videoUrl

    if (url) {
      let videoID = this.validateYouTubeUrl(url)
      this.state.inputData.videoID = videoID;
      this.setState({})
      if (!videoID) {
        toast.error('Invalid Video URL', {
          duration: 5000,
          position: "top-right",
        })
        return;
      } else {
        let info = await axios.get(`https://www.youtube.com/oembed?format=json&url=${url}`)
        info = info.data
        console.log('video info', info)
        this.state.inputData.title = info.title;
        this.setState({})
      }
      console.log(this.state.inputData)
    }

  }
  validateYouTubeUrl(url) {
    const youtubeUrlPattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    const match = url.match(youtubeUrlPattern);

    if (match && match[1]) {
      return match[1];
    } else {
      return null;
    }
  }
  render() {
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
                  {!this.state.showShareVideo &&
                    <div className='col-md-10 '>
                      <div onClick={this.showShareVideo.bind(this)} className='add-post-input'>Share video</div>
                    </div>}
                  {this.state.showShareVideo &&
                    <div className='col-md-10 add-post-exit-container'>
                      <FaTimes onClick={this.closeShareVideo.bind(this)} className='add-post-exit' />
                    </div>}
                </div>
                {this.state.showShareVideo &&
                  <div className='col-md-12'>
                    <div className='add-post-input-container'>
                      <div className="form-group">
                        <input
                          onChange={this.onChangeValue.bind(this, "videoUrl")}
                          type="text"
                          className="form-control input-post-url"
                          onBlur={this.onBlurUrl.bind(this)}
                          placeholder="Youtube url" />
                      </div>
                      <div className="form-group">
                        <textarea
                          onChange={this.onChangeValue.bind(this, "description")}
                          rows='3'
                          type="text"
                          className="form-control input-post-url"
                          placeholder="Description" />
                      </div>
                      {this.state.inputData.videoID &&
                        <div className='view-post'>
                          <iframe
                            width="100%"
                            height="400px"
                            // height="315"
                            src={`https://www.youtube.com/embed/${this.state.inputData.videoID}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>

                          </iframe>
                        </div>
                      }
                      <div onClick={this.addPost.bind(this)} className="btn btn-post">Share video</div>
                    </div>

                  </div>
                }
              </div>
            </div>
            <div className="card">
              <div className="card-body view-post">
                <div className='col-md-12 flex'>
                  <div className='col-md-1 '>
                    <img className='view-post-avatar' src="avt.jpeg"></img>
                  </div>
                  <div className='col-md-4 '>
                    <div className='view-post-user'>user001@gmail.com</div>
                    <div className='view-post-time'>20:06</div>
                  </div>
                </div>
                <div className='col-md-12 flex'>
                  <div className='view-post-desc'>
                    This is an Amazing Video
                  </div>
                </div>
                <div className='col-md-12 flex'>
                  <div className='view-post'>
                    <iframe
                      width="100%"
                      height="400px"
                      // height="315"
                      src="https://www.youtube.com/embed/ZaI7zkQ8nxA"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen>

                    </iframe>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body" style={{ height: "400px" }}>

              </div>
            </div>
            <div className="card">
              <div className="card-body" style={{ height: "400px" }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;