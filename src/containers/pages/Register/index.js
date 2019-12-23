import React, { Component } from 'react';
import './Register.css';
import Button from '../../../component/atoms/Button';
import { registerUserAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const {email, password} = this.state;
        console.log('data default send: ', email, password);
        const res = await this.props.registerAPI({email,password});
        if(res) {
            console.log('REGISTER SUCCESS');
                this.setState({
                    email: '',
                    password: ''
                })
        } else {
            console.log('REGISTER FAILED');
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div class="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" onChange={this.handleChangeText} value={this.state.email} placeholder="email" type="text"/>
                    <input className="input" id="password" onChange={this.handleChangeText} value={this.state.password} placeholder="password" type="password" />
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                </div>
            </div>
        );
    }
}

const reduxState = (state) => {
    return  {
        isLoading: state.isLoading
    }
}

const reduxDispatch = (dispatch) => {
    return {
        registerAPI: (data) => dispatch(registerUserAPI(data))
    }
}

export default connect(reduxState, reduxDispatch)(Register);