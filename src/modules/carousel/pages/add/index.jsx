/**
 * carousel edit page.
 */
import React from 'react';
import { CarouselEdit } from '../../components';
import { PageDetail, xhttp } from '../../../common';
import { notification } from 'antd';

export class CarouselAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="carousel-add-page">
                <CarouselEdit submit={ this.submit.bind(this) }></CarouselEdit>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/carousel/create', data).then(result => {
            notification.success({
                message: '轮播图创建成功',
                description: data.title + ' 已保存。',
            });

            this.props.history.push('/carousel/' + result);
        });
    }
}