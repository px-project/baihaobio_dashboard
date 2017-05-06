/**
 * job list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Button, Table, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
    { title: '岗位', dataIndex: 'asdasd', key: 'name', width: '20%' },
    { title: '实验室', dataIndex: 'asd', key: 'a', width: '20%' },
    { title: '人数', dataIndex: 'asdasdasd', key: 'asdasd', width: '30%' },
    { title: '创建时间', dataIndex: 'asdasda', key: 'asdasdasd', width: '30%' },
    {
        title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (text) => (
            <span>
                <Link to={ `/job/${text}` }>详情</Link>
                <Link to={ `/job/${text}/edit` }>编辑</Link>
                <a>删除</a>
            </span>
        )
    }
]

export class JobPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        this.getjobList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }

    render() {
        let { loading, list } = this.state;
        return (
            <Page className="job-page">
                <PageHeader>
                    <Button type="primary"><Link to="/job/add">添加</Link></Button>
                    <div className="right">
                        <Search placeholder="请输入关键字"></Search>
                    </div>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ columns } dataSource={ list }></Table>
                </Loader>
            </Page>
        );
    }

    getjobList(page = 1) {
        return xhttp.get('/jobs/lists/rows/20/page/' + page);
    }
}