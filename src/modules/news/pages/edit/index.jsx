/**
 * news edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { NewsEdit } from '../../components';
import { notification } from 'antd';

export class NewsEditPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { detail: {}, loading: false, saving: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get('/news/detail/_id/' + this.props.match.params.news_id)
			.then(news => this.setState({ detail: news, loading: false }));
	}

	render() {
		let { detail, types, loading, saving } = this.state;
		return (
			<PageDetail className="news-edit-page">
				<Loader loading={ loading }>
					<NewsEdit init={ detail } submit={ this.submit.bind(this) } saving={ saving }></NewsEdit>
				</Loader>
			</PageDetail>
		);
	}

	submit(data) {

		let { match } = this.props, { detail } = this.state;
		data.id = match.params.news_id;
		if (data.photo === detail.photo) delete data.photo;

		this.setState({ saving: true });
		xhttp.post('/news/update', data).then(result => {
			notification.success({
				message: '新闻更新成功'
			});

			this.setState({ saving: false });
			this.props.history.push('/news/' + data.id);
		});
	}
}