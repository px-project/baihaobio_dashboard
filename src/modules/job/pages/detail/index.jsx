/**
 * job detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class JobDetailPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { detail: {}, loading: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		xhttp.get('/jobs/detail/_id/' + this.props.match.params.job_id)
			.then(job => this.setState({ detail: job, loading: false }));
	}

	render() {
		let { loading, detail = {} } = this.state;
		return (
			<PageDetail className="job-detail-page">
				<Loader loading={ loading }>
					<FieldMap name="实验室">{ detail.lab }</FieldMap>
					<FieldMap name="招聘职位">{ detail.station }</FieldMap>
					<FieldMap name="人数">{ detail.number }</FieldMap>
					<FieldMap name="岗位要求">
						<ul>
							{ (detail.demand || []).map((item, index) =>
								<li key={ index }>{ item }</li>
							) }
						</ul>
					</FieldMap>
					<ButtonGroup>
						<Button type="primary">
							<Link to={ `/job/${detail.id}/edit` }>编辑</Link>
						</Button>
					</ButtonGroup>
				</Loader>
			</PageDetail>
		);
	}
}
