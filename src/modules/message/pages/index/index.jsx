/**
 * messgae list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Table, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export class MessagePage extends React.Component {
    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
        { title: '联系人', dataIndex: 'name', key: 'name', width: '20%' },
        { title: '联系电话', dataIndex: 'phone', key: 'phone', width: '20%' },
        { title: '留言', dataIndex: 'content', key: 'content', width: '30%' },
        {
            title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text, record) => (
                <span>
                    <a onClick={ this.detail.bind(this, record) }>详情</a>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ];

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false, detail: null, deleting: false, deleteConfirm: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.getmessgaeList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }

    render() {
        let { loading, list, detail, deleting } = this.state;
        return (
            <Page className="messgae-page">
                <PageHeader>
                    <div className="right">
                        <Search placeholder="请输入关键字"></Search>
                    </div>
                </PageHeader>

                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ this.columns } dataSource={ list }></Table>
                </Loader>

                <Modal title="留言详情" visible={ !!detail } footer={
                    <div style={ { display: 'flex' } }>
                        <Button loading={ deleting } type="danger" onClick={ this.delete.bind(this) }>删除</Button>
                        <Button style={ { marginLeft: 'auto' } } type="primary" onClick={ this.close.bind(this) }>关闭</Button>
                    </div>
                } closable={ true } onCancel={ this.close.bind(this) }>

                </Modal>
            </Page>
        );
    }

    getmessgaeList(page = 1) {
        return xhttp.get('/feedback/lists/rows/20/page/' + page);
    }

    detail(message) {
        this.setState({ detail: message });
    }

    delete() {
        this.setState({ deleting: true });
    }

    close() {
        this.setState({ detail: null });
    }
}