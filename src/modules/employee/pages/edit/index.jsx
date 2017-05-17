/**
 * employee edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { EmployeeEdit } from '../../components';
import { notification } from 'antd';

export class EmployeeEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/employee/employeeDetail/_id/' + this.props.match.params.employee_id)
            .then(employees => {
                this.setState({ detail: employees, loading: false });
            });
    }

    render() {
        let { detail, types, loading } = this.state;
        return (
            <PageDetail className="employee-edit-page">
                <Loader loading={ loading }>
                    <EmployeeEdit init={ detail } types={ types } submit={ this.submit.bind(this) }></EmployeeEdit>
                </Loader>
            </PageDetail>
        );
    }

    submit(data) {
        let { match } = this.props, { detail } = this.state;
        data.id = match.params.employee_id;
        if (data.photo === detail.photo) delete data.photo;

        xhttp.post('/employee/updateEmployee', data).then(result => {
            notification.success({
                message: '职员更新成功',
                description: data.name + ' 已保存。'
            });
            this.props.history.push('/employee/' + data.id);
        });
    }
}