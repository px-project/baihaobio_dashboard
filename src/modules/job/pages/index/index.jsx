/**
 * job list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Table, Input, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export class JobPage extends React.Component {

	tableConfig = [
		{ title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
		{ title: '岗位', dataIndex: 'station', key: 'station', width: '20%' },
		{ title: '实验室', dataIndex: 'lab', key: 'lab', width: '20%' },
		{ title: '人数', dataIndex: 'number', key: 'number', width: '30%' },
		{ title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '30%' },
		{
			title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text, record) => (
				<span>
					<Link to={ `/job/${text}` }>详情</Link>
					<Link to={ `/job/${text}/edit` }>编辑</Link>
					<a onClick={ this.delete.bind(this, record) }>删除</a>
				</span>
			)
		}
	];

	constructor(props) {
		super(props);
		this.state = { list: [], loading: false };
	}

	componentWillMount() {
		this.setState({ loading: true });
		this.getjobList().then(res => {
			this.setState({ list: res.list, loading: false });
		});
	}

	render() {
		let { loading, list } = this.state;
		return (
			<Page className="job-page">
				<PageHeader>
					<Button type="primary"><Link to="/job/add">添加</Link></Button>
					<div className="right">
						<Search placeholder="请输入关键字"></Search>
					</div>
				</PageHeader>
				<Loader loading={ loading }>
					<Table rowKey="id" columns={ this.tableConfig } dataSource={ list }></Table>
				</Loader>
			</Page>
		);
	}

	getjobList(page = 1) {
		return xhttp.get('/jobs/lists/rows/20/page/' + page);
	}

	delete(job) {
		Modal.confirm({
			title: `确认删除职位：${job.station}?`,
			content: `此操作不可逆，请核对职位名称：${job.station}。`,
			maskClosable: true,
			onOk: () => new Promise((resolve, reject) => {
				xhttp.post('/jobs/delete', { _id: job.id }).then(result => {
					this.setState({ list: this.state.list.filter(item => item !== job) });
					resolve();
					notification.success({
						message: '职位删除成功',
						description: job.station + ' 已删除。'
					});
				});
			})
		});
	}
}