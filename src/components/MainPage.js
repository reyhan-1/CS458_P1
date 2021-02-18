import React, { Component } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/users'
})

export default class MainPage extends Component {
    state = {
        userData : {}
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ email: params.email })
        this.getUserData(params.email)
    }

    getUserData = async (email) => {
        try {
            await api.get('?email=' + email).then(resp =>
            this.setState({userData: resp.data[0]}))
        } catch (err) {
            console.log(err);
        }

    }

    render() {
        return (

            <div className="container-block">
                <div>
                    <span className="form-footer">Welcome {this.state.userData.email}</span>
                </div>
                <br />
                <div>
                    <span className="form-footer">Phone Number: {this.state.userData.phone_number}</span>
                </div>
            </div>
        )
    }

}