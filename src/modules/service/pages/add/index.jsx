/**
 * service add page.
 */
import React from 'react';
import { ServiceEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class ServiceAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { types: [], saving: false };
	}

	componentWillMount() {
		xhttp.get('/service/sortList').then(result => {
			this.setState({ types: result });
		});
	}

	render() {
		let { types, saving } = this.state;
		return (
			<PageDetail className="service-add-page">
				<ServiceEdit types={ types } submit={ this.save.bind(this) } saving={ saving }></ServiceEdit>
			</PageDetail>
		);
	}

	save(data) {
		this.setState({ saving: true });
		xhttp.post('/service/create', data).then(result => {
			notification.success({
				message: '服务创建成功',
				description: data.title + ' 已保存。',
			});

			this.setState({ saving: true });
			this.props.history.push('/service');
		});
	}
}