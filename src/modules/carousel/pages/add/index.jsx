/**
 * carousel edit page.
 */
import React from 'react';
import { CarouselEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class CarouselAddPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { saving: false };
	}

	render() {
		return (
			<PageDetail className="carousel-add-page">
				<CarouselEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></CarouselEdit>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		xhttp.post('/carousel/create', data).then(result => {
			notification.success({
				message: '轮播图创建成功',
				description: data.title + ' 已保存。',
			});
			this.setState({ saving: false });
			this.props.history.push('/carousel/' + result);
		});
	}
}