/**
 *  app page.
 */
import React from 'react';
import { Header, Sidebar } from '../../components';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as pages from '../../../pages';
const routerConfig = require('../../../../config/router.json');
import { toBigCamcelCase as bigCamel } from '../../../../utils';
import './style.scss';

let config = [];
routerConfig.forEach(module => {
    if (module.modules) config = config.concat(module.modules);
    else config.push(module);
});

export class AppPage extends React.Component {
    render() {
        return (
            <div className="app">
                <Sidebar {...this.props}></Sidebar>
                <div id="main">
                    <Header {...this.props}></Header>
                    <div className="views">
                        <Switch>
                            { config.map((module, moduleIndex) => module.pages.map((page, pageIndex) => (
                                <Route key={ `${moduleIndex}${pageIndex}` } {...this.props}
                                    path={ `/${module.path}` + (page.path ? `/${page.path}` : '') }
                                    component={ pages[bigCamel(module.path, (page.name || page.path), 'page')] }></Route>
                            ))) }

                            <Redirect to='/home' />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
