/**
 * news list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Link } from 'react-router-dom';
import { Button, Table, Input, Modal, notification } from 'antd';

const { Search } = Input;

export class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, indx) => indx + 1 },
        { title: '标题', dataIndex: 'title', key: 'title', width: '20%' },
        { title: '摘要', dataIndex: 'shortDesc', key: 'shortDesc', width: '40%' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        {
            title: '操作', dataIndex: 'id', key: 'id', render: (text, record) => (
                <span>
                    <Link to={ `/news/${text}` }>详情</Link>
                    <Link to={ `/news/${text}/edit` }>编辑</Link>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ];

    componentWillMount() {
        this.setState({ loading: true });
        this.getNewsList().then(res => {
            this.setState({ list: res.list, loading: false });
        })
    }
    render() {
        let { list, loading } = this.state;
        return (
            <Page className="news-page">
                <PageHeader>
                    <Button type="primary"><Link to="/news/add">添加</Link></Button>
                    <div className="right">
                        <Search placeholder="请输入关键字查询"></Search>
                    </div>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ this.columns } dataSource={ list }></Table>
                </Loader>
            </Page>
        );
    }

    getNewsList(page = 1) {
        return xhttp.get('/news/newsList/rows/20/page/' + page);
    }

    delete(news) {
        Modal.confirm({
            title: `确认删除新闻：${news.title}?`,
            content: `此操作不可逆，请核对新闻名称：${news.title}。`,
            maskClosable: true,
            onOk: () => new Promise((resolve, reject) => {
                xhttp.post('/news/delete', { _id: news.id }).then(result => {
                    this.setState({ list: this.state.list.filter(item => item !== news) });
                    resolve();
                    notification.success({
                        message: '新闻删除成功',
                        description: news.title + ' 已删除。'
                    });
                });
            })
        });
    }
}