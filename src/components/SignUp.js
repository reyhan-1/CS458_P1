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
  changePhoneNumber = event => { 
    const { value } = event.target;
    const pattern = /^[0-9\b+() ]+$/;
    if(value === '' || pattern.test(value)) {
      this.setState({ phone_number: value });
    }
  }
  changePassword = event => { event.preventDefault(); this.setState({ password: event.target.value }) }


  onSubmit = async (e) => {
    e.preventDefault()
    const { email, phone_number, password } = this.state;

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!email || !phone_number || !password) {
      this.setState({ 
        formError: "Please fill all of the fields.",
        passwordError: '',
        emailError: '',
        phoneNumberError: ''
      });
      return;
    }

    if (!emailPattern.test(email)) {
      this.setState({ 
        emailError: "Please enter valid email address.", 
        formError: '',
        passwordError: '',
        phoneNumberError: '', 
      });
      return;
    }
    
    if (!passwordPattern.test(password)) {
      this.setState({ 
        passwordError: "Your password must contain at least one numeric digit, one uppercase and one lowercase letter with minimum length 8.",
        formError: '',
        emailError: '',
        phoneNumberError: '',
      });
      return;
    }

    try {
      let data = { email, phone_number, password }
      let res = await api.post('/', data);
      this.setState({ redirect_succ: true })

    } catch (err) {
      this.setState({ 
        emailError: "This email is already in use.", 
        formError: '',
        passwordError: '',
        phoneNumberError: '', 
      });
    }

  }

  render() {
    const { emailError, phoneNumberError, passwordError, formError } = this.state;

    if (localStorage.getItem('email')) {
      return <Redirect to={`/dashboard/` + localStorage.getItem('email')} />
    }
    
    if (this.state.redirect_succ === true) {
      return <Redirect to={'/signin'} />
    }
    return (

      <form className='signup' onSubmit={this.onSubmit}>
        <div className='signup-control'>
          <input type='text' placeholder='Email address' onChange={this.changeEmail} />
          {emailError && <span id="email-error" style={{ color: "red" }}>{emailError}</span>}
          <input
            type='text'
            placeholder='Phone Number'
            value={this.state.phone_number}
            onChange={this.changePhoneNumber}
          />
          {phoneNumberError && <span id="phone-error" style={{ color: "red" }}>{phoneNumberError}</span>}
          <input type="password"
            id="password"
            placeholder="Password"
            onChange={this.changePassword}
          />
          {passwordError && <span id="password-error" style={{ color: "red" }}>{passwordError}</span>}
          <input type='submit' value='Register' className='mybutton mybutton-block' />
          {formError && <span id="form-error" style={{ color: "red" }}>{formError}</span>}
        </div>
      </form>
    )
  }


}

