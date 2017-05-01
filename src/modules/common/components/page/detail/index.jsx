/**
 * detail page component.
 */
import React from 'react';
import './style.scss';

export const PageDetail = ({ className = '', children }) => (
    <div className={ `_page-detail ${className}` }>
        { children }
    </div>
);