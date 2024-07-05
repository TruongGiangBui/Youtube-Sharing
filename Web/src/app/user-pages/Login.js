import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import configData from "../../config.json";
import toast, { Toaster } from 'react-hot-toast';
const SERVER_URL = configData.SERVER_URL
export class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      inputData: {
        email: "",
        password: "",
      }
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
  async submit() {
    try {
      let response = await axios.post(
        SERVER_URL + `/api/auth/login`, {
        "email": this.state.inputData.email,
        "password": this.state.inputData.password
      }
      );
      if(response.data){
        localStorage.setItem('accessToken-yts',response.data.accessToken);
        this.props.history.push('/');
      }
      // 
    } catch (err) {
      console.log(err.response.data)
      if (err.response && err.response.data) {
        toast.error(err.response.data.message, {
          duration: 5000,
          position: "top-center",
        })
      }
    }

  }
  async componentDidMount(){
    try {
      let response = await axios.get(
        SERVER_URL + `/api/auth/userInfo`,
        { 'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken-yts')}` }}
      );
      if(response.status==200){
        this.props.history.push('/'); 
      }
      
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <div>
        <Toaster />
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5 login-form">
                <h6 className="">Sign in to continue.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input onChange={this.onChangeValue.bind(this, "email")} type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <input onChange={this.onChangeValue.bind(this, "password")} type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                  </div>


                  <div className="mt-3">
                    <div onClick={this.submit.bind(this)} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</div>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Dont have an account? <Link to="/user/register" className="text-primary">Register</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
