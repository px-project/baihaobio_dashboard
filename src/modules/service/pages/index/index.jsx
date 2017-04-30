/**
 * service list page.
 */
import React from 'react';
import { Table, Button, Input } from 'antd';
import { Page, PageHeader } from '../../../common';
import { ServiceType } from '../../components';
import { Link } from 'react-router-dom';
import { xhttp } from '../../../common';

const { Search } = Input;

const tableConfig = [
    { title: '序号', dataIndex: 'index', key: 'index', width: '10%' },
    { title: '名称', dataIndex: 'name', key: 'name', width: '20%' },
    { title: '类型', dataIndex: 'type', key: 'type', width: '20%' },
    { title: '创建时间', dataIndex: 'create_time', key: 'create_time', width: '25%' },
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

    componentWillMount() {
        xhttp.list('service', [], {}).then(result => {
            console.log(result);
        })
    }

    render() {
        return (
            <Page className="service-page">
                <PageHeader>
                    <Button type="primary">
                        <Link to="/service/add">添加</Link>
                    </Button>
                    <ServiceType className="right"></ServiceType>
                    <Search placeholder="请输入关键字查询"></Search>
                </PageHeader>
                <Table pagination={ true } columns={ tableConfig }></Table>
            </Page>
        );
    }
}