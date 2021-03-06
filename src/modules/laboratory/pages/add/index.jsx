/**
 * laboratory edit page.
 */
import React from 'react';
import { LaboratoryEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class LaboratoryAddPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { saving: false };
	}

	render() {
		return (
			<PageDetail className="laboratory-add-page">
				<LaboratoryEdit submit={ this.submit.bind(this) } saving={ this.state.saving }></LaboratoryEdit>
			</PageDetail>
		);
	}

	submit(data) {
		this.setState({ saving: true });

		xhttp.post('/laboratorys/create', data).then(result => {
			notification.success({
				message: '招聘创建成功'
			});

			this.setState({ saving: false });

			this.props.history.push('/laboratory/' + result);
		});
	}
}