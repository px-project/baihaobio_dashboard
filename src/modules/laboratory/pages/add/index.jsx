/**
 * laboratory edit page.
 */
import React from 'react';
import { laboratoryEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class laboratoryAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="laboratory-add-page">
                <laboratoryEdit submit={ this.submit.bind(this) }></laboratoryEdit>
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