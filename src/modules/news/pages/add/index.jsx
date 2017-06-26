/**
 * news add page.
 */
import React from 'react';
import { NewsEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class NewsAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { saving: false };
	}
	render() {
		return (
			<PageDetail className="news-add-page">
				<NewsEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></NewsEdit>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		xhttp.post('/news/create', data).then(result => {
			notification.success({
				message: '招聘创建成功'
			});
			this.setState({ saving: false });
			this.props.history.push('/news/' + result);
		});
	}
}