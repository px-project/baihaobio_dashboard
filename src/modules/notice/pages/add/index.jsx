/**
 * notice add page.
 */
import React from 'react';
import { NoticeEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class NoticeAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { saving: false };
	}

	render() {
		return (
			<PageDetail className="notice-add-page">
				<NoticeEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></NoticeEdit>
			</PageDetail>
		);
	}
	submit(data) {
		this.setState({ saving: true });

		xhttp.post('/notice/create', data).then(result => {
			notification.success({
				message: '公告创建成功'
			});
			this.setState({ saving: false });
			this.props.history.push('/notice/' + result);
		});
	}
}