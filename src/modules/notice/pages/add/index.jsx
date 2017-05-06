/**
 * notice add page.
 */
import React from 'react';
import { NoticeEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class NoticeAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="notice-add-page">
                <NoticeEdit submit={ this.submit.bind(this) }></NoticeEdit>
            </PageDetail>
        );
    }
    submit(data) {
        xhttp.post('/notice/create', data).then(result => {
            notification.success({
                message: '公告创建成功'
            });

            this.props.history.push('/notice/' + result);
        });
    }
}