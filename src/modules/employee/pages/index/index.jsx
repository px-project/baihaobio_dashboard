/**
 * employee list page.
 */
import React from 'react';
import { xhttp, Page, PageHeader, Loader } from '../../../common';
import { Link } from 'react-router-dom';
import { Button, Table, Input, Modal, notification } from 'antd';

const { Search } = Input;

export class EmployeePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { list: [], loading: false };
    }

    columns = [
        { title: '序号', dataIndex: 'index', key: 'index', width: '10%', render: (text, record, index) => index + 1 },
        { title: '姓名', dataIndex: 'name', key: 'name', width: '25%' },
        { title: '职位', dataIndex: 'position', key: 'position' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '15%' },
        {
            title: '操作', dataIndex: 'id', key: 'id', width: '15%', render: (id, record) => (
                <span>
                    <Link to={ `/employee/${id}` }>详情</Link>
                    <Link to={ `/employee/${id}/edit` }>编辑</Link>
                    <a onClick={ this.delete.bind(this, record) }>删除</a>
                </span>
            )
        }
    ];

    componentWillMount() {
        this.setState({ loading: true });
        this.getEmployeeList().then(res => {
            this.setState({ list: res.list, loading: false });
        });
    }

    render() {
        let { loading, list } = this.state;
        return (
            <Page className="employee-page">
                <PageHeader>
                    <Button type="primary"><Link to="/employee/add">添加</Link></Button>
                    <div className="right">
                        <Search className="right" placeholder="请输入关键字查询"></Search>
                    </div>
                </PageHeader>
                <Loader loading={ loading }>
                    <Table rowKey="id" columns={ this.columns } dataSource={ list }></Table>
                </Loader>
            </Page>
        );
    }

    getEmployeeList(page = 1) {
        return xhttp.get('/employee/employeeList/rows/20/page/' + page);
    }

    delete(employee) {
        Modal.confirm({
            title: `确认删除职员：${employee.name}?`,
            content: `此操作不可逆，请核对职员名称：${employee.name}。`,
            maskClosable: true,
            onOk: () => new Promise((resolve, reject) => {
                xhttp.post('/employee/deleteEmployee', { _id: employee.id }).then(result => {
                    this.setState({ list: this.state.list.filter(item => item !== employee) });
                    resolve();
                    notification.success({
                        message: '职员删除成功',
                        description: employee.name + ' 已删除。'
                    });
                });
            })
        });
    }
}