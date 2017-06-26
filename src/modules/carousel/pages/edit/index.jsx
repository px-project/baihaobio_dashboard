/**
 * carousel edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { CarouselEdit } from '../../components';
import { notification } from 'antd';

export class CarouselEditPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { detail: {}, loading: false, saving: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get('/carousel/detail/_id/' + this.props.match.params.carousel_id)
			.then(carousel => this.setState({ detail: carousel, loading: false }));
	}

	render() {
		let { detail, types, loading, saving } = this.state;
		return (
			<PageDetail className="carousel-edit-page">
				<Loader loading={ loading }>
					<CarouselEdit init={ detail } submit={ this.submit.bind(this) } saving={ saving }></CarouselEdit>
				</Loader>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });
		let { match } = this.props, { detail } = this.state;
		data.id = match.params.carousel_id;
		if (data.photo === detail.photo) delete data.photo;

		xhttp.post('/carousel/update', data).then(result => {
			notification.success({
				message: '轮播图更新成功'
			});
			this.setState({ saving: false });
			this.props.history.push('/carousel/' + data.id);
		});
	}
}