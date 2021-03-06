/**
 * user list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Link } from 'react-router-dom';
import { Button, Table, Input } from 'antd';

const { Search } = Input;

const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: '25%' },
    { title: '职位', dataIndex: 'position', key: 'position' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%' },
    {
        title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: id => (
            <span>
                <Link to={ `/user/${id}` }>详情</Link>
                <Link to={ `/user/${id}/edit` }>编辑</Link>
                <a>删除</a>
            </span>
        )
    }
];

export class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.getUserList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }

    render() {
        let { loading, list } = this.state;
        return (
            <Page className="user-page">
                <PageHeader>
                    <Button type="primary"><Link to="/user/add">添加</Link></Button>
                    <div className="right">
                        <Search className="right" placeholder="请输入关键字查询"></Search>
                    </div>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ columns } dataSource={ list }></Table>
                </Loader>
            </Page>
        );
    }

    getUserList(page = 1) {
        return xhttp.get('/user/userList/rows/20/page/' + page);
    }
}