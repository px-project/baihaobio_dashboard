/**
 * service add page.
 */
import React from 'react';
import { ServiceEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class ServiceAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="service-add-page">
                <ServiceEdit submit={ this.save.bind(this) }></ServiceEdit>
            </PageDetail>
        );
    }
    save(data) {
        return console.log(data);
        xhttp.post('/service/create', data).then(result => {
            notification.success({
                message: '服务创建成功',
                description: data.title + ' 已保存。',
            });

            this.props.history.push('/service');
        });
    }
}