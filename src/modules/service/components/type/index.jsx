/**
 * select service type component.
 */
import React from 'react';
import { Select } from 'antd';
const { Option, OptGroup } = Select;
import './style.scss';
import { xhttp } from '../../../common';

export class ServiceType extends React.Component {
    constructor(props) {
        super(props);
        this.state = { types: [] };
    }

    componentWillMount() {
        xhttp.get('/service/sortList').then(result => {
            this.setState({ types: result });
        });
    }

    render() {
        let { className = '', empty = false, type = 0, style, disabled } = this.props;
        let { types } = this.state;
        return (
            <Select placeholder={ empty ? '全部服务类型' : '请选择服务类型' } disabled={ disabled }
                className={ `service-type ${className}` } style={ style }>
                { types
                    .filter(item => !type || item.type === ('' + type))
                    .map((item, index) => (
                        <Option key={ index } value={ item.id }>{ item.title }</Option>
                    )) }
            </Select>
        );
    }
}