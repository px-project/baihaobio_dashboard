/**
 * icon component
 */
import React from 'react';
import './style.scss';

export const Icon = ({ icon, classname = '', onClick }) => (
    <i className={ `l-icon fa fa-${icon} ${classname}` } onClick={ onClick }></i>
);