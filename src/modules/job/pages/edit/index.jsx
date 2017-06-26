/**
 * job edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { JobEdit } from '../../components';
import { Spin, notification } from 'antd';

export class JobEditPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { types: [], detail: {}, loading: false, saving: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get(`/jobs/detail/_id/${this.props.match.params.job_id}`)
			.then(jobs => {
				this.setState({ detail: jobs, loading: false });
			});
	}

	render() {
		let { detail, types, loading, saving } = this.state;
		return (
			<PageDetail className="job-edit-page">
				<Loader loading={ loading }>
					<JobEdit init={ detail } types={ types } submit={ this.submit.bind(this) } saving={ saving }></JobEdit>
				</Loader>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		data._id = this.props.match.params.job_id;
		xhttp.post('/jobs/update', data).then(result => {
			notification.success({
				message: '招聘职位更新成功',
				description: data.station + ' 已保存。'
			});
			this.setState({ saving: false });
			this.props.history.push('/job/' + data._id);
		});
	}
}