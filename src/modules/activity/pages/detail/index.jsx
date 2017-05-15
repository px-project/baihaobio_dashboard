/**
 * activity detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class ActivityDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/activity/detail/_id/' + this.props.match.params.activity_id)
            .then(activity => this.setState({ detail: activity, loading: false }));
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="activity-detail-page">
                <Loader loading={ loading }>
                    <FieldMap name="标题">{ detail.title }</FieldMap>
                    <FieldMap name="封面" type="image" url={ detail.photo }></FieldMap>
                    <FieldMap name="简介">{ detail.shortDesc }</FieldMap>
                    <FieldMap name="活动详情" type="rich">{ detail.content }</FieldMap>
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/activity/${detail.id}/edit` }>编辑</Link>
                        </Button>
                        <Button type="danger">删除</Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
