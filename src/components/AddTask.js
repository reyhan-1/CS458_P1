import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'



const api = axios.create({
  baseURL: 'http://localhost:5000/users'
})

export default class SignIn extends Component {

  state = {
    userInfo: [],
    email: "",
    password: "",
    rememBerMe: false,
    forgotPasswordEnable: false
    
  }

  getUser = async (email, pass) => {
    try{
      await api.get('?email=' + email +'&password=' + pass).then( resp => this.setState( {userInfo: resp.data}));
      if (this.state.userInfo.length === 0){
        await api.get('?phone_number=' + email +'&password=' + pass).then( resp => this.setState( {userInfo: resp.data}));
      }
      if (this.state.userInfo.length === 0){
        await api.get('?email=' + email).then( resp => this.setState( {userInfo: resp.data}))
        if (this.state.userInfo.length != 0) {
          this.setState({forgotPasswordEnable: true })
        }
      }

    }catch (err) {
      console.log(err);
    }
    
  }


  onSubmit = (e) => {
    e.preventDefault()
    this.getUser(this.state.email, this.state.password)
  }

  changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value })}
  changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value })}
  changeRememberMe = e => {e.preventDefault(); this.setState({rememBerMe: e.target.value})}

  render() {

    return (


        <form className='signin' onSubmit={this.onSubmit}>
          <div className='signin-control'>
          {this.state.forgotPasswordEnable && <a>Incorrect password. Please try again or you can reset your password.</a>}
            <input
              type='text'
              placeholder='Email or phone number'
              onChange={this.changeEmail}
            />
          </div>
          <div className='signin-control'>
            <input
              type='text'
              placeholder='Password'
              onChange={this.changePassword}
            />
          </div>
          <div className='signin-control signin-control-check'>
            <label>Remember me</label>
            <input
              type='checkbox'
              onChange={this.changeRememberMe}
            />
          </div>
          <div>
            <span style="right=">New to Netflix?</span>
            <a> Sign up now.</a>

          </div>
          <br></br>

          <input type='submit' value='Sign In' className='mybutton mybutton-block' />
        </form>



    )

  }
}