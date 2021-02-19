import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


const api = axios.create({
    baseURL: 'http://localhost:5000/users'
})

export default class ResetPassword extends Component {
    state = {
        userData: {},
        newPassword: "",
        confirmPassword: "",
        match_error: "",
        resetCompleted: false
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ email: params.email })
        this.getUserData(params.email)
    }

    getUserData = async (email) => {
        try {
            await api.get('?email=' + email).then(resp => this.setState({ userData: resp.data[0] }))
        } catch (err) {
            console.log(err);
        }
    }

    updateUserData = async (email) => {
        try {
            if (this.state.newPassword === this.state.confirmPassword) {

                let newData = {
                    email: this.state.userData.email,
                    phone_number: this.state.userData.phone_number,
                    password: this.state.newPassword
                }
                await api.delete('/' + email).then(resp => console.log(resp))
                try {
                    let res = await api.post('/', newData);

                } catch (err) {
                    this.setState({ errors: "This email is already in use." });
                }
                this.setState({ resetCompleted: true })

            }
            else {
                this.setState({ match_error: "Passwords does not match", passwordError: "" })
            }



        } catch (err) {
            console.log(err);
        }

    }
    changePassword = event => { event.preventDefault(); this.setState({ newPassword: event.target.value }) }
    changeConfirmPassword = event => { event.preventDefault(); this.setState({ confirmPassword: event.target.value }) }


    onSubmit = (e) => {
        e.preventDefault();

        const { newPassword } = this.state;

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

        if (!passwordPattern.test(newPassword)) {
            this.setState({
                passwordError: "Your password must contain at least one numeric digit, one uppercase and one lowercase letter with minimum length 8.",
                match_error: "",
            });
            return;
        }

        this.updateUserData(this.state.email, this.state.password);
    }

    render() {
        const { match_error, passwordError } = this.state;

        if (this.state.resetCompleted) {
            return <Redirect to={`/signin`} />
        }
        
        return (
            

            <div className="container-block">
                <form className="sign-in" onSubmit={this.onSubmit}>
                    <div>
                        <span className="sing-in">Welcome {this.state.email}</span>
                    </div>
                    <br />
                    <div className='signin-control'>
                        <input id='password' type='password' placeholder='Password' onChange={this.changePassword} />
                    </div>
                    <div className='signin-control'>
                        <input id='password-confirmation' type='password' placeholder='Password Confirmation' onChange={this.changeConfirmPassword} />
                    </div>
                    <div>
                        {passwordError && <span id="password-error" style={{ color: "red" }}>{passwordError}</span>}
                        {match_error && <span id="match_error" style={{ color: "red" }}>{match_error}</span>}
                    </div>
                    <div>

                        <input type='submit' value='Sign In' className='mybutton mybutton-block' />

                    </div>
                </form>


            </div>
        )
    }

}