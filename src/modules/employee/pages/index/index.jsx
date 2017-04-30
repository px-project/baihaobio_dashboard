/**
 * employee list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader } from '../../../common';
import { Link } from 'react-router-dom';
import { Button, Table, Input } from 'antd';

const { Search } = Input;

const columns = [
    { title: '序号', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '职位', dataIndex: 'position', key: 'position' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
        title: '操作', render: (text, record, index) => (
            <span>
                <Link to={ `/employee/${record.id}` }>详情</Link>
                <Link to={ `/employee/${record.id}/edits` }>编辑</Link>
                <a>删除</a>
            </span>
        )
    }
];

export class EmployeePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    componentWillMount() {
        this.getEmployeeList().then(res => {
            this.setState({ list: res.list });
        });
    }

    render() {
        return (
            <Page className="employee-page">
                <PageHeader>
                    <Button type="primary"><Link to="/employee/add">添加</Link></Button>
                    <div className="right">
                        <Search className="right" placeholder="请输入关键字查询"></Search>
                    </div>
                </PageHeader>
                <Table columns={ columns } dataSource={ this.state.list }></Table>
            </Page>
        );
    }

    getEmployeeList(page = 1) {
        return xhttp.get('/employee/employeeList/rows/20/page/' + page);
    }
}