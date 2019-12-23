import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../component/atoms/Button';
import { loginUserAPI } from '../../../config/redux/action';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const {email, password} = this.state;
        const {history} = this.props;
        console.log('data default send: ', email, password);
        const res = await this.props.loginAPI({email,password}).catch(err => err);
        if(res) {
            console.log('LOGIN SUCCESS', res);
            localStorage.setItem('userData', JSON.stringify(res));
            this.setState({
                email: '',
                password: ''
            })
        history.push('/');
        } else {
            console.log('LOGIN FAILED');
        }
    }

    render() {
        return (
            <div className="auth-container">
                <div class="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" onChange={this.handleChangeText} value={this.state.email} placeholder="email" type="text"/>
                    <input className="input" id="password" onChange={this.handleChangeText} value={this.state.password} placeholder="password" type="password" />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
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
        loginAPI: (data) => dispatch(loginUserAPI(data))
    }
}

export default connect(reduxState, reduxDispatch)(Login);