import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../assets/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import axios from 'axios';

import configData from "../config.json";
const SERVER_URL = configData.SERVER_URL
class App extends Component {
  constructor(props) {
    super();
    this.state = {
    }
  }
  async componentWillMount(){
    console.log("componentWillMount")
   
  }
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar /> : '';
    return (
        <div className="main-content">
          {navbarComponent}
          <div id="modal-backdrop"></div>
          <div className="">
            <div className="">
              <AppRoutes/>
            </div>
          </div>
        </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");

    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user/login', '/user/register', '/error-pages/error-404', '/error-pages/error-500'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        // document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        // document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }

}

export default withRouter(App);
