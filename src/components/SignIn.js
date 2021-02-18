import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const api = axios.create({
  baseURL: 'http://localhost:5000/users'
})

export default class SignIn extends Component {

  state = {
    email: "",
    password: "",
    rememBerMe: false
  }

  getUser = async (x) => {
    let data = await api.get('?q=' + x ).then(resp => {
      data = resp.data;

    });
  }


  onSubmit = (e) => {
    e.preventDefault()
  }

  changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value })}
  changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value })}
  changeRememberMe = e => { this.setState({rememBerMe: e.target.value}) }
  render() {

    return (
        <div className="container-block">
          <form className='signin' onSubmit={this.onSubmit}>
            <div className='signin-control'>
              <input
                type='text'
                placeholder='Email or phone number'
                onChange={this.changeEmail}
              />
            </div>
            <div className='signin-control'>
              <input
                type='password'
                placeholder='Password'
                onChange={this.changePassword}
              />
            </div>
            <div className='signin-control signin-control-check'>
              <label>Remember me</label>
              <input
                type='checkbox'
                onChange={this.changeRememberMe}
                value={this.state.rememBerMe}
              />
            </div>

            <input type='submit' value='Sign In' className='mybutton mybutton-block' />
          </form>
          <span className="form-footer">New to Netflix? <Link to="/signup">Sign up now.</Link></span>
        </div>
    )

  }
}