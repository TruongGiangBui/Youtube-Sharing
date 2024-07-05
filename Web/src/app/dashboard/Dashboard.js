import React, { Component, useState, useEffect, useRef } from 'react';

import { socket } from '../../socket';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaTimes } from "react-icons/fa";

import moment from 'moment';
import callApi from '../utils/Restful';

export class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      inputData: {
        videoUrl: "",
        description: "",
        title: "",
        videoId: "",
        thumbnail: "",
      },
      posts: [],
      showShareVideo: false
    }
  }

  notification(data) {
    toast((t) => (
      <div className='notify-item' style={{border:"none",margin:0}}>

        <img className='notify-thumnail' src={data.thumbnail}></img>

        <div className='notify-item-text'>
          <div className='time'>{moment(data.updatedAt).format('HH:MM')}</div>
          <div className='user'>{data.email} shared a video</div>
          <div className='title'>{data.title}</div>
        </div>
      </div>
    ), {
      duration: 5000, // Auto close duration in milliseconds
      position: "bottom-right",
    });
  }
  async componentDidMount() {
    function onConnect() {
      console.log("Connected")
    }
    function onDisconnect() {
      console.log("Disconnected")
    }
    socket.on('connect', onConnect);
    socket.on('notification', this.notification);
    socket.on('disconnect', onDisconnect);
    this.loadPosts(0)
  }
  async loadPosts(frompost) {
    let res = await callApi('/api/post/newpost', 'GET', { frompost: frompost })
    if (res.status == 200) {
      this.setState({
        posts: res.data.data
      })
    }
  }

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
  async shareVideo() {
    await this.onBlurUrl()
    let res = await callApi('/api/post/shareVideo', 'POST', this.state.inputData)
    if (res.status == 200) {
      toast.success(res.data.message, {
        duration: 5000,
        position: "top-center",
      })
      this.loadPosts(0)
      this.closeShareVideo()
    } else {
      toast.error(res.data.message, {
        duration: 5000,
        position: "top-center",
      })
    }
  }
  reset() {
    this.setState({
      ...this.state,
      inputData: {
        videoUrl: "",
        description: "",
        title: "",
        videoID: "",
        thumbnail: "",
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
      let videoId = this.validateYouTubeUrl(url)
      this.state.inputData.videoId = videoId;
      this.setState({})
      if (!videoId) {
        toast.error('Invalid Video URL', {
          duration: 5000,
          position: "top-right",
        })
        return;
      } else {
        let info = await axios.get(`https://www.youtube.com/oembed?format=json&url=${url}`)
        info = info.data
        // console.log('video info', info)
        this.state.inputData.title = info.title;
        this.state.inputData.thumbnail = info.thumbnail_url
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
        <div className="row1 ">
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
                      {this.state.inputData.videoId &&
                        <div className='view-post'>
                          <iframe
                            width="100%"
                            height="400px"
                            // height="315"
                            src={`https://www.youtube.com/embed/${this.state.inputData.videoId}`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>

                          </iframe>
                        </div>
                      }
                      <div onClick={this.shareVideo.bind(this)} className="btn btn-post">Share video</div>
                    </div>

                  </div>
                }
              </div>
            </div>
            {this.state.posts.map((post) => {
              return <div className="card">
                <div className="card-body view-post">
                  <div className='col-md-12 flex'>
                    <div className='col-md-1 '>
                      <img className='view-post-avatar' src="avt.jpeg"></img>
                    </div>
                    <div className='col-md-6 '>
                      <div className='view-post-user'>{post.email}</div>
                      <div className='view-post-time'>{moment(post.updatedAt).format('DD/MM/YYYY HH:MM')}</div>
                    </div>
                  </div>
                  <div className='col-md-12 flex'>
                    <div className='view-post-desc'>
                      {post.description}
                    </div>
                  </div>
                  <div className='col-md-12 flex'>
                    <div className='view-post'>
                      <iframe
                        width="100%"
                        height="400px"
                        // height="315"
                        src={`https://www.youtube.com/embed/${post.videoId}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>

                      </iframe>
                    </div>
                  </div>
                </div>
              </div>
            })}

          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;