import React, { useState, Component } from 'react'

import { Redirect } from 'react-router-dom'

import axios from 'axios'



const api = axios.create({
  baseURL: 'http://localhost:5000/users/'
})

export default class SignUp extends Component {

  state = {
    email: "",
    phone_number: "",
    password: "",
    errors: "",
    redirect_succ: false
  };

  constructor() {
    super();
    this.getUsers();
  }

  getUsers = async () => {
    let data = await api.get('/').then(({ data }) => data);
  }

  changeEmail = event => { event.preventDefault(); this.setState({ email: event.target.value }) }
  changePhoneNumber = event => { event.preventDefault(); this.setState({ phone_number: event.target.value }) }
  changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }) }


  onSubmit = async (e) => {
    e.preventDefault()

    try {
      let data = { email: this.state.email, phone_number: this.state.phone_number, password: this.state.password }
      let res = await api.post('/', data);
      this.setState({ redirect_succ: true })

    } catch (err) {
      this.setState({ errors: "This email is already in use." });
    }

  }


  render() {

    if (this.state.redirect_succ === true) {
      return <Redirect to={'/signin'} />
    }
    return (

      <form className='signup' onSubmit={this.onSubmit}>

        <div className='signup-control'>
          
          <input type='email' placeholder='Email address' onChange={this.changeEmail} />
          {this.state.errors && <span style={{ color: "red" }}>{this.state.errors}</span>}
          
          <input
            type='number'
            placeholder='Phone Number'
            onChange={this.changePhoneNumber}
          />

          <input type="password"
            id="password"
            placeholder="Password"
            onChange={this.changePassword}
          />

          <input type='submit' value='Register' className='mybutton mybutton-block' />

        </div>





      </form>
    )
  }


}

