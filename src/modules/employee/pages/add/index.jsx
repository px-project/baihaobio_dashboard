/**
 * employee edit page.
 */
import React from 'react';
import { EmployeeEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class EmployeeAddPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { saving: false };
	}
	render() {
		return (
			<PageDetail className="employee-add-page">
				<EmployeeEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></EmployeeEdit>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		xhttp.post('/employee/createEmployee', data).then(result => {
			notification.success({
				message: '职员创建成功',
				description: data.name + ' 已保存。',
			});
			this.setState({ saving: false });
			this.props.history.push('/employee');
		});
	}
}