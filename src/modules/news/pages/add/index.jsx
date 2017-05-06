/**
 * news add page.
 */
import React from 'react';
import { NewsEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class NewsAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="news-add-page">
                <NewsEdit submit={ this.submit.bind(this) }></NewsEdit>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/news/create', data).then(result => {
            notification.success({
                message: '招聘创建成功'
            });

            this.props.history.push('/news/' + result);
        });
    }
}