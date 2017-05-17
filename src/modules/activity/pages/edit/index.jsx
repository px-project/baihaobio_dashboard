/**
 * activity edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { ActivityEdit } from '../../components';
import { notification } from 'antd';

export class ActivityEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/activity/detail/_id/' + this.props.match.params.activity_id)
            .then(activity => {
                this.setState({ detail: activity, loading: false });
            });
    }

    render() {
        let { newData, types, loading } = this.state;
        return (
            <PageDetail className="activity-edit-page">
                <Loader loading={ loading }>
                    <ActivityEdit init={ detail } submit={ this.submit.bind(this) }></ActivityEdit>
                </Loader>
            </PageDetail>
        );
    }

    submit(data) {
        let { match } = this.props, { detail } = this.state;
        data.id = match.params.activity_id;
        if (data.photo === detail.photo) delete data.photo;

        xhttp.post('/activity/update', data).then(result => {
            notification.success({
                message: '活动更新成功'
            });
            this.props.history.push('/activity/' + data.id);
        });
    }
}