/**
 * loader component.
 */
import React from 'react';
import './style.scss';
import { Spin } from 'antd';

export class Loader extends React.Component {
    render() {
        let { loading, children } = this.props;
        return (
            <div className="_loader">
                { loading
                    ? <Spin></Spin>
                    : children
                }
            </div>
        );
    }
}