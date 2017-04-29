/**
 * page compnent.
 */
import React from 'react';
import classname from 'classname';
import './style.scss';

export class Page extends React.Component {
    render() {
        let { className } = this.props;
        return (
            <div className={ `_page ${className}` }>
                { this.props.children }
            </div>
        );
    }
}