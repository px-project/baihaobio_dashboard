/**
 * service add page.
 */
import React from 'react';
import { ServiceEdit } from '../../components';
import { PageDetail } from '../../../common';

export class ServiceAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="service-add-page">
                <ServiceEdit></ServiceEdit>
            </PageDetail>
        );
    }
}