/**
 * job edit page.
 */
import React from 'react';
import { JobEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class JobAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { saving: false };
	}
	render() {
		return (
			<PageDetail className="job-add-page">
				<JobEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></JobEdit>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		xhttp.post('/jobs/create', data).then(result => {
			notification.success({
				message: '招聘创建成功'
			});
			this.setState({ saving: false });
			this.props.history.push('/job');
		});
	}
}