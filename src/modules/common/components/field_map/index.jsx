/**
 * field map component.
 */
import React from 'react';
import './style.scss';

export const FieldMap = ({ name, type = '', children, url }) => (
    <div className="_field-map">
        { name ? <label>{ name }</label> : '' }
        <div className="_field-map-value">
            {!type && (children || '-')}

            {type === 'image' && <img src={`//www.baihaobio.com/${url}`}/>}

            {type === 'rich' && <div className="rich" dangerouslySetInnerHTML={{__html: children}}></div>}
            
        </div>
    </div>
);