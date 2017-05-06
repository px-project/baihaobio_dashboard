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
            <div className="_loader" style={ { display: loading ? 'flex' : 'block' } }>
                { loading
                    ? <Spin></Spin>
                    : children
                }
            </div>
        );
    }
}