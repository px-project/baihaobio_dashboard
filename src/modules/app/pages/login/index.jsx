/**
 * login page.
 */
import React from 'react';
import { xhttp, Icon } from '../../../common';
import { LoginForm } from '../../components/login';
import './style.scss';

export class LoginPage extends React.Component {
    render() {
        return (
            <div className="login-page">
                <LoginForm login={ this.login.bind(this) }></LoginForm>
            </div>
        );
    }
    login(data) {
        xhttp.post('/admin/login', data).then(res => {
            console.log(res);
            this.props.history.push('/home');
        });
    }
}