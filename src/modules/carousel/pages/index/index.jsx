/**
 * carousel list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Table, Input, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

export class CarouselPage extends React.Component {

    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
        {
            title: '背景图', dataIndex: 'photo', key: 'photo', width: '15%', render: text => (
                <img src={ `http://www.baihaobio.com${text}` } />
            )
        },
        { title: '名称', dataIndex: 'title', key: 'title', width: '20%' },
        { title: '描述', dataIndex: 'description', key: 'description', width: '30%' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '20%' },
        {
            title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text, record) => (
                <span>
                    <Link to={ `/carousel/${text}` }>详情</Link>
                    <Link to={ `/carousel/${text}/edit` }>编辑</Link>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ]

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.getCarouselList().then(res => this.setState({ list: res.list, loading: false }));
    }

    render() {
        let { loading, list } = this.state;
        return (
            <Page className="carousel-page">
                <PageHeader>
                    <Button type="primary"><Link to="/carousel/add">添加</Link></Button>
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

    getCarouselList(page = 1) {
        return xhttp.get('/carousel/lists/rows/20/page/' + page);
    }

    delete(carousel) {
        Modal.confirm({
            title: `确认删除轮播图：${carousel.title}?`,
            content: `此操作不可逆，请核对轮播图名称：${carousel.title}。`,
            maskClosable: true,
            onOk: () => new Promise((resolve, reject) => {
                xhttp.post('/carousel/delete', { _id: carousel.id }).then(result => {
                    this.setState({ list: this.state.list.filter(item => item !== carousel) });
                    resolve();
                    notification.success({
                        message: '轮播图删除成功',
                        description: carousel.title + ' 已删除。'
                    });
                });
            })
        });
    }
}