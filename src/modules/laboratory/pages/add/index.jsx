/**
 * laboratory edit page.
 */
import React from 'react';
import { LaboratoryEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class LaboratoryAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="laboratory-add-page">
                <LaboratoryEdit submit={ this.submit.bind(this) }></LaboratoryEdit>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/laboratorys/create', data).then(result => {
            notification.success({
                message: '招聘创建成功'
            });

            this.props.history.push('/laboratorys/' + result);
        });
    }
}