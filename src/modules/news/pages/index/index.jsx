/**
 * news list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader } from '../../../common';
import { Link } from 'react-router-dom';
import { Button, Table, Input } from 'antd';

const { Search } = Input;

const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, indx) => indx + 1 },
    { title: '标题', dataIndex: 'title', key: 'title', width: '20%' },
    { title: '摘要', dataIndex: 'shortDesc', key: 'shortDesc', width: '40%' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
        title: '操作', dataIndex: 'id', key: 'id', render: (text) => (
            <span>
                <Link to={ `/news/${text}` }>详情</Link>
                <Link to={ `/news/${text}/edit` }>编辑</Link>
                <a>删除</a>
            </span>
        )
    }
];

export class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [] };
    }
    componentWillMount() {
        this.getNewsList().then(res => {
            this.setState({ list: res.list });
        })
    }
    render() {
        return (
            <Page className="news-page">
                <PageHeader>
                    <Button type="primary"><Link to="/news/add">添加</Link></Button>
                    <div className="right">
                        <Search placeholder="请输入关键字查询"></Search>
                    </div>
                </PageHeader>
                <Table columns={ columns } dataSource={ this.state.list }></Table>
            </Page>
        );
    }

    getNewsList(page = 1) {
        return xhttp.get('/news/newsList/rows/20/page/' + page);
    }
}