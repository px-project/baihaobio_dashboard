/**
 * activity add page.
 */
import React from 'react';
import { PageDetail } from '../../../common';
import { ActivityEdit } from '../../components';

export class ActivityAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="activity-add-page">
                <ActivityEdit submit={ this.submit.bind(this) }></ActivityEdit>
            </PageDetail>
        );
    }
    submit(data) {
        console.log(data);
    }
}