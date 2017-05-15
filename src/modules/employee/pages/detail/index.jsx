/**
 * employee detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class EmployeeDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/employee/employeeDetail/_id/' + this.props.match.params.employee_id)
            .then(employee => this.setState({ detail: employee, loading: false }));
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="employee-detail-page">
                <Loader loading={ loading }>
                    <FieldMap name="姓名">{ detail.name }</FieldMap>
                    <FieldMap name="职位">{ detail.position }</FieldMap>
                    <FieldMap name="邮箱">{ detail.email }</FieldMap>
                    <FieldMap name="联系方式">{ detail.telephone }</FieldMap>
                    <FieldMap name="头像" type="image" url={ detail.photo }></FieldMap>
                    <FieldMap name="简介">{ detail.description }</FieldMap>
                    <FieldMap name="研究方向" type="rich">{ detail.study }</FieldMap>
                    <FieldMap name="文献" type="rich">{ detail.thesis }</FieldMap>
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/employee/${detail.id}/edit` }>编辑</Link>
                        </Button>
                        <Button type="danger">删除</Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
