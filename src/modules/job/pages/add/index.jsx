/**
 * job edit page.
 */
import React from 'react';
import { JobEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class JobAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="job-add-page">
                <JobEdit submit={ this.submit.bind(this) }></JobEdit>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/jobs/create', data).then(result => {
            notification.success({
                message: '招聘创建成功'
            });

            this.props.history.push('/jobs/' + result);
        });
    }
}