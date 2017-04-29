/**
 * app page
 */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {AppPage} from '../index/index';
import {LoginPage} from '../login';

function loginAuth() {
    // return !!localStorage.getItem('token');
    return true;
}

export class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={ LoginPage }></Route>
                    <Route path="/" render={ props => (
                        loginAuth()
                            ? <AppPage {...props}></AppPage>
                            : <Redirect to={ { pathname: '/login', state: { from: props.location } } }></Redirect>
                    ) }></Route>
                </Switch>
            </Router>
        );
    }
}