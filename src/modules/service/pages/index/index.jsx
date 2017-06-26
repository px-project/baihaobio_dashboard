/**
 * service list page.
 */
import React from 'react';
import { Table, Button, Input, Modal, notification, Select } from 'antd';
import { Page, PageHeader, Loader } from '../../../common';
import { ServiceType } from '../../components';
import { Link } from 'react-router-dom';
import { xhttp } from '../../../common';

const { Option } = Select;
const { Search } = Input;

export class ServicePage extends React.Component {

	tableConfig = [
		{ title: '序号', dataIndex: 'index', key: 'i', width: '10%', render: (text, record, index) => index + 1 },
		{ title: '名称', dataIndex: 'title', key: 'name', width: '35%' },
		{ title: '类型', dataIndex: 'sortTitle', key: 'sortTitle', width: '15%' },
		{ title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%' },
		{
			title: '操作',
			key: 'action',
			width: '15%',
			render: (text, record) => (
				<span>
					<Link to={ `/service/${record.id}` }>详情</Link>
					<Link to={ `/service/${record.id}/edit` }>编辑</Link>
					<a onClick={ this.delete.bind(this, record) }>删除</a>
				</span>
			)
		}
	]

	constructor(props) {
		super(props);
		this.state = { services: [], sorts: [], loading: false, page: 1 };
	}

	componentDidMount() {
		this.setState({ loading: true });
		xhttp.get('/service/serviceList/rows/20/page/' + this.state.page)
			.then(services => {
				this.setState({ services: services.list });
				return xhttp.get('/service/sortList');
			})
			.then(sorts => {
				this.setState({ sorts, loading: false });
			});
	}

	render() {
		let { services, loading, sorts } = this.state;
		return (
			<Page className="service-page">
				<PageHeader>
					<Button type="primary">
						<Link to="/service/add">添加</Link>
					</Button>

					<Select className="right" placeholder="全部类型服务" style={ { width: 150 } }>
						{ sorts.map((sort, index) => <Option key={ index } value={ sort.id }>{ sort.title }</Option>) }
					</Select>
					<Search placeholder="请输入关键字查询"></Search>
				</PageHeader>
				<Loader loading={ loading }>
					<Table rowKey="id" dataSource={ services } pagination={ true } columns={ this.tableConfig }></Table>
				</Loader>
			</Page>
		);
	}

	delete(service) {
		Modal.confirm({
			title: `确认删除服务：${service.title}?`,
			content: `此操作不可逆，请核对服务名称：${service.title}。`,
			maskClosable: true,
			onOk: () => new Promise((resolve, reject) => {
				xhttp.post('/service/delete', { _id: service.id }).then(result => {
					this.setState({ services: this.state.services.filter(item => item !== service) });
					resolve();
					notification.success({
						message: '服务删除成功',
						description: service.title + ' 已删除。'
					});
				});
			})
		});
	}
}