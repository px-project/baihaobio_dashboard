/**
 * service edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { ServiceEdit } from '../../components';
import { Spin, notification } from 'antd';

export class ServiceEditPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { types: [], detail: {}, loading: false, saving: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get('/service/sortList')
			.then(types => {
				this.setState({ types: types });
				return xhttp.get('/service/detail/_id/' + this.props.match.params.service_id);
			})
			.then(services => {
				this.setState({ detail: services, loading: false });
			});
	}

	render() {
		let { detail, types, loading, saving } = this.state;
		return (
			<PageDetail className="service-edit-page">
				<Loader loading={ loading }>
					<ServiceEdit init={ detail } types={ types } submit={ this.submit.bind(this) } saving={ saving }></ServiceEdit>
				</Loader>
			</PageDetail>
		);
	}

	submit(data) {
		data.id = this.props.match.params.service_id;
		this.setState({ saving: true });
		xhttp.post('/service/update', data).then(result => {
			notification.success({
				message: '服务更新成功',
				description: data.title + ' 已保存。'
			});
			this.setState({ saving: false });
			this.props.history.push('/service/' + data.id);
		});
	}
}