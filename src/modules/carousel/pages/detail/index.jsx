/**
 * carousel detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class CarouselDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/carousel/detail/_id/' + this.props.match.params.carousel_id)
            .then(carousel => this.setState({ detail: carousel, loading: false }));
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="carousel-detail-page">
                <Loader loading={ loading }>
                    <FieldMap name="名称">{ detail.title }</FieldMap>
                    <FieldMap name="跳转链接">
                        <a href={ detail.link } target="_blank">{ detail.link }</a>
                    </FieldMap>
                    <FieldMap name="背景图" type="image" url={ detail.photo }></FieldMap>
                    <FieldMap name="备注">{ detail.description }</FieldMap>
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/carousel/${detail.id}/edit` }>编辑</Link>
                        </Button>
                        <Button type="danger">删除</Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
