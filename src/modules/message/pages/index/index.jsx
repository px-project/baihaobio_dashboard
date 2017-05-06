/**
 * messgae list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader } from '../../../common';
import { Button, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
    { title: '联系人', dataIndex: 'name', key: 'name', width: '20%' },
    { title: '联系电话', dataIndex: 'phone', key: 'phone', width: '20%' },
    { title: '留言', dataIndex: 'content', key: 'content', width: '30%' },
    {
        title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text) => (
            <span>
                <Link to={ `/messgae/${text}` }>详情</Link>
                <a>删除</a>
            </span>
        )
    }
]

export class MessagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    componentWillMount() {
        this.getmessgaeList().then(res => {
            this.setState({ list: res.list });
        });
    }

    render() {
        return (
            <Page className="messgae-page">
                <PageHeader>
                    <div className="right">
                        <Search placeholder="请输入关键字"></Search>
                    </div>
                </PageHeader>
                <Table columns={ columns } dataSource={ this.state.list }></Table>
            </Page>
        );
    }

    getmessgaeList(page = 1) {
        return xhttp.get('/feedback/lists/rows/20/page/' + page);
    }
}