/**
 * notice edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { NoticeEdit } from '../../components';
import { notification } from 'antd';

export class NoticeEditPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { detail: {}, loading: false, saving: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get('/notice/detail/_id/' + this.props.match.params.notice_id)
			.then(notice => this.setState({ detail: notice, loading: false }));
	}

	render() {
		let { detail, types, loading, saving } = this.state;
		return (
			<PageDetail className="notice-edit-page">
				<Loader loading={ loading }>
					<NoticeEdit init={ detail } submit={ this.submit.bind(this) } saving={ saving }></NoticeEdit>
				</Loader>
			</PageDetail>
		);
	}

	submit(data) {
		data._id = this.props.match.params.notice_id;
		this.setState({ saving: true });

		xhttp.post('/notice/update', data).then(result => {
			notification.success({
				message: '公告更新成功'
			});
			this.setState({ saving: false });

			this.props.history.push('/notice/' + data._id);
		});
	}
}