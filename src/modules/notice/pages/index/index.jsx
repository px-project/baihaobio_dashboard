/**
 * notice list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Table, Input, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export class NoticePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
        { title: '内容', dataIndex: 'content', key: 'content', width: '60%' },
        { title: '发布时间', dataIndex: 'createTime', key: 'createTime', width: '15%' },
        {
            title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text, record) => (
                <span>
                    <Link to={ `/notice/${text}` }>详情</Link>
                    <Link to={ `/notice/${text}/edit` }>编辑</Link>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ];


    componentWillMount() {
        this.setState({ loading: true });
        this.getNoticeList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }

    render() {
        let { loading, list } = this.state;
        return (
            <Page className="notice-page">
                <PageHeader>
                    <Button type="primary"><Link to="/notice/add">添加</Link></Button>
                    <div className="right">
                        <Search placeholder="请输入关键字"></Search>
                    </div>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ this.columns } dataSource={ list }></Table>
                </Loader>
            </Page>
        );
    }

    getNoticeList(page = 1) {
        return xhttp.get('/notice/noticeList/rows/20/page/' + page);
    }

    delete(notice) {
        Modal.confirm({
            title: `确认删除公告：${notice.content}?`,
            content: `此操作不可逆，请核对公告名称：${notice.content}。`,
            maskClosable: true,
            onOk: () => new Promise((resolve, reject) => {
                xhttp.post('/notice/delete', { _id: notice.id }).then(result => {
                    this.setState({ list: this.state.list.filter(item => item !== notice) });
                    resolve();
                    notification.success({
                        message: '公告删除成功',
                        description: notice.content + ' 已删除。'
                    });
                });
            })
        });
    }
}