/**
 * activity add page.
 */
import React from 'react';
import { PageDetail, xhttp } from '../../../common';
import { ActivityEdit } from '../../components';
import { notification } from 'antd';

export class ActivityAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="activity-add-page">
                <ActivityEdit submit={ this.submit.bind(this) }></ActivityEdit>
            </PageDetail>
        );
    }
    submit(data) {
        xhttp.post('/activity/create', data).then(result => {
            notification.success({
                message: '活动创建成功'
            });

            this.props.history.push('/activity/' + result);
        });
    }
}