/**
 * laboratory edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { LaboratoryEdit } from '../../components';
import { notification } from 'antd';

export class LaboratoryEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/laboratory/detail/_id/' + this.props.match.params.laboratory_id)
            .then(laboratory => this.setState({ detail: laboratory, loading: false }));
    }

    render() {
        let { detail, loading } = this.state;
        return (
            <PageDetail className="laboratory-edit-page">
                <Loader loading={ loading }>
                    <LaboratoryEdit init={ detail } submit={ this.submit.bind(this) }></LaboratoryEdit>
                </Loader>
            </PageDetail>
        );
    }

    submit(data) {
        let { match } = this.props, { detail } = this.state;

        data._id = match.params.laboratory_id;
        if (data.photo === detail.photo) delete data.photo;

        xhttp.post('/laboratory/update', data).then(result => {
            notification.success({
                message: '实验室图集更新成功',
                description: data.name + ' 已保存。'
            });
            this.props.history.push('/laboratory/' + data._id);
        });
    }
}