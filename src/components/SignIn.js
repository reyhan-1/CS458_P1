import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'



const api = axios.create({
  baseURL: 'http://localhost:5000/users'
})

export default class SignIn extends Component {
  state = {
    userInfo: 0,
    email: "",
    password: "",
    rememberMe: false,
    signInStatus: -1,
    forgotPasswordEnable: false
  }

  getUser = async (email, pass) => {
    try {
      await api.get('?email=' + email + '&password=' + pass).then(resp => this.setState({ userInfo: resp.data }));
      if (this.state.userInfo.length === 0) {
        await api.get('?phone_number=' + email + '&password=' + pass).then(resp => this.setState({ userInfo: resp.data }));

        if (this.state.userInfo.length === 0) {
          await api.get('?email=' + email).then(resp => this.setState({ userInfo: resp.data }))
          if (this.state.userInfo.length !== 0) {
            // only correct email
            this.setState({ forgotPasswordEnable: true })
          }
          else {
            if (this.state.email.length !== 0) {
                this.setState({ signInStatus: 500 })
            }
          }
        }
        else {
          // correct credentials with phone number
          this.setState({ signInStatus: 200 })
        }
      }
      else {
        // correct credentials
        this.setState({ signInStatus: 200 })
      }


    } catch (err) {
      console.log(err);
    }

  }


  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ signInStatus: -1, forgotPasswordEnable: false })
    const { email, password} = this.state;
    if (!email || !password) {
      this.setState({ 
        showFormError: true,
      });
      return;
    }

    // here we can check whether we have correct type of input (email or phone no)
    this.getUser(this.state.email, this.state.password);
  }

  changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }) }
  changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }) }
  changeRememberMe = e => { this.setState({ rememberMe: e.target.value }) }
  render() {
    if (localStorage.getItem('email')) {
      return <Redirect to={`/dashboard/` + localStorage.getItem('email')} />
    }

    if (this.state.signInStatus === 200) {
      const { rememberMe } = this.state;
      if (rememberMe) {
        localStorage.setItem('email', this.state.userInfo[0].email);
      }
      
      return <Redirect to={`/dashboard/` + this.state.userInfo[0].email} />
    }

    return (


      <div className="container-block">
        <h1>Sign In</h1>
        <br />
        {this.state.forgotPasswordEnable && <div id="warning" className="info-box">
          <span>Incorrect password. Please try again or you can
          <Link to={'/resetpassword/' + this.state.email}> reset your password.</Link>
          </span>
        </div>}
        {this.state.signInStatus === 500 &&
          <div id="warning" className="info-box">
            <span>Sorry, we can't find an account with this email address. Please try again or <Link to='/signup'>create a new account.</Link></span>
          </div>
        }
        {(this.state.signInStatus !== 500 && this.state.showFormError) &&
          <div id="warning" className="info-box">
            <span>Sorry, please fill in all of the fields.</span>
          </div>
        }
        <form className='signin' onSubmit={this.onSubmit}>
          <div className='signin-control'>
            <input
              id='email'
              type='text'
              placeholder='Email or phone number'
              onChange={this.changeEmail}
            />
          </div>
          <div className='signin-control'>
            <input
              id='password'
              type='password'
              placeholder='Password'
              onChange={this.changePassword}
            />
          </div>
          <div className='signin-control signin-control-check'>
            <label>Remember me</label>
            <input
              id='rememberMe'
              type='checkbox'
              onChange={this.changeRememberMe}
              value={this.state.rememberMe}
            />
          </div>

          <input type='submit' value='Sign In' className='mybutton mybutton-block' />
        </form>
        <span className="form-footer">New to Netflix? <Link to="/signup">Sign up now.</Link></span>
      </div>
    )

  }
}