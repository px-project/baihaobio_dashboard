/**
 * service list page.
 */
import React from 'react';
import { Table, Button, Input } from 'antd';
import { Page, PageHeader, Loader } from '../../../common';
import { ServiceType } from '../../components';
import { Link } from 'react-router-dom';
import { xhttp } from '../../../common';

const { Search } = Input;

const tableConfig = [
    { title: '序号', dataIndex: 'index', key: 'i', width: '10%', render: (text, record, index) => index + 1 },
    { title: '名称', dataIndex: 'title', key: 'name', width: '20%' },
    { title: '类型', dataIndex: 'sortTitle', key: 'sortTitle', width: '20%' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '25%' },
    {
        title: '操作',
        key: 'action',
        width: '20%',
        render: (text, record) => (
            <span>
                <Link to={ `/service/${record.id}` }>详情</Link>
                <Link to={ `/service/${record.id}/edit` }>编辑</Link>
                <Link to={ `/service/${record.id}` }>删除</Link>
            </span>
        )
    }
];

export class ServicePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { services: [], loading: false };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getServiceList().then(result => {
            this.setState({ services: result.list, loading: false });
        });
    }

    render() {
        let { services, loading } = this.state;
        return (
            <Page className="service-page">
                <PageHeader>
                    <Button type="primary">
                        <Link to="/service/add">添加</Link>
                    </Button>
                    <ServiceType className="right" empty={ true }></ServiceType>
                    <Search placeholder="请输入关键字查询"></Search>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" dataSource={ services } pagination={ true } columns={ tableConfig }></Table>
                </Loader>
            </Page>
        );
    }

    getServiceList(page = 1) {
        return xhttp.get('/service/serviceList/rows/20/page/' + page);
    }
}