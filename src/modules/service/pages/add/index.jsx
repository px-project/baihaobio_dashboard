/**
 * service add page.
 */
import React from 'react';
import { ServiceEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class ServiceAddPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { types: [] };
    }

    componentWillMount() {
        xhttp.get('/service/sortList').then(result => {
            this.setState({ types: result });
        });
    }

    render() {
        return (
            <PageDetail className="service-add-page">
                <ServiceEdit types={ this.state.types } submit={ this.save.bind(this) }></ServiceEdit>
            </PageDetail>
        );
    }

    save(data) {
        xhttp.post('/service/create', data).then(result => {
            notification.success({
                message: '服务创建成功',
                description: data.title + ' 已保存。',
            });

            this.props.history.push('/service');
        });
    }
}