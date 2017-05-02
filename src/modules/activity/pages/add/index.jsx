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
                <ActivityEdit></ActivityEdit>
            </PageDetail>
        );
    }
}