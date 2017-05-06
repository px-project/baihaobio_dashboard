/**
 * employee edit page.
 */
import React from 'react';
import { EmployeeEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class EmployeeAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="employee-add-page">
                <EmployeeEdit submit={ this.submit.bind(this) }></EmployeeEdit>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/employee/createEmployee', data).then(result => {
            notification.success({
                message: '职员创建成功',
                description: data.name + ' 已保存。',
            });

            this.props.history.push('/employee');
        });
    }
}