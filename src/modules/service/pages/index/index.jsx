/**
 * service list page.
 */
import React from 'react';
import { Table, Button, Input } from 'antd';
import { Page, PageHeader } from '../../../common';
import { ServiceType } from '../../components';
import { Link } from 'react-router-dom';

const { Search } = Input;

export class ServicePage extends React.Component {
    render() {
        return (
            <Page className="service-page">
                <PageHeader>
                    <Button type="primary">
                        <Link to="/service/add">添加</Link>
                    </Button>
                    <ServiceType className="right"></ServiceType>
                    <Search placeholder="请输入关键字查询"></Search>
                </PageHeader>
                <Table></Table>
            </Page>
        );
    }
}