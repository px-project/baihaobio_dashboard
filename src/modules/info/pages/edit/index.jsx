/**
 * Info edit page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader } from '../../../common';
import { InfoEdit } from '../../components';
import { notification } from 'antd';

export class InfoEditPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/admin/company').then(info => this.setState({ detail: info, loading: false }));
    }

    render() {
        let { detail, loading } = this.state;
        return (
            <PageDetail className="Info-edit-page">
                <Loader loading={ loading }>
                    <InfoEdit init={ detail } submit={ this.submit.bind(this) }></InfoEdit>
                </Loader>
            </PageDetail>
        );
    }

    submit(data) {
        xhttp.post('/admin/updateCompany', data).then(result => {
            notification.success({
                message: '公司更新成功'
            });
            this.props.history.push('/info');
        });
    }
}