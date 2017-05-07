/**
 * activity list page.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Input, Table, Modal, notification } from 'antd';

const { Search } = Input;

export class ActivityPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
        { title: '标题', dataIndex: 'title', key: 'title', width: '20%' },
        { title: '简介', dataIndex: 'shortDesc', key: 'shortDesc', width: '40%' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        {
            title: '操作', dataIndex: 'id', render: (id, record, index) => (
                <span>
                    <Link to={ `/activity/${id}` }>详情</Link>
                    <Link to={ `/activity/${id}/edit` }>编辑</Link>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ];

    componentWillMount() {
        this.setState({ loading: true });
        this.getActivityList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }
    render() {
        let { loading, list } = this.state;
        return (
            <Page className="activity-page">
                <PageHeader>
                    <Button type="primary"><Link to="/activity/add">添加</Link></Button>
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

    getActivityList(page = 1) {
        return xhttp.get("/activity/lists/rows/20/page/" + page);
    }

    delete(activity) {
        Modal.confirm({
            title: `确认删除活动：${activity.title}?`,
            content: `此操作不可逆，请核对活动名称：${activity.title}。`,
            maskClosable: true,
            onOk: () => new Promise((resolve, reject) => {
                xhttp.post('/activity/delete', { _id: activity.id }).then(result => {
                    this.setState({ list: this.state.list.filter(item => item !== activity) });
                    resolve();
                    notification.success({
                        message: '活动删除成功',
                        description: activity.title + ' 已删除。'
                    });
                });
            })
        });
    }
}