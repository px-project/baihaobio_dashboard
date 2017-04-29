/**
 * page header component.
 */
import React from 'react';
import './style.scss';

export class PageHeader extends React.Component {
    render() {
        return (
            <header className="_page-header">
                { this.props.children }
            </header>
        );
    }
}