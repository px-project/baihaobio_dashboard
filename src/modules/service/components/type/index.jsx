/**
 * select service type component.
 */
import React from 'react';
import { Select } from 'antd';
const { Option, OptGroup } = Select;
import './style.scss';

export class ServiceType extends React.Component {
    render() {
        let { className, empty = false } = this.props;
        return (
            <Select placeholder={ empty ? '全部服务类型' : '请选择服务类型' }
                className={ `service-type ${className}` }>
            </Select>
        );
    }
}