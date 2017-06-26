/**
 * activity add page.
 */
import React from 'react';
import { PageDetail, xhttp } from '../../../common';
import { ActivityEdit } from '../../components';
import { notification } from 'antd';

export class ActivityAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { saving: false };
	}

	render() {
		return (
			<PageDetail className="activity-add-page">
				<ActivityEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></ActivityEdit>
			</PageDetail>
		);
	}
	submit(data) {
		this.setState({ saving: true });
		xhttp.post('/activity/create', data).then(result => {
			notification.success({
				message: '活动创建成功'
			});

			this.setState({ saving: false });
			this.props.history.push('/activity/' + result);
		});
	}
}