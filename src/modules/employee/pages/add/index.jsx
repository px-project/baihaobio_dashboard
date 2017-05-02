/**
 * empolyee edit page.
 */
import React from 'react';
import { EmpolyeeEdit } from '../../components';
import { PageDetail } from '../../../common';

export class EmployeeAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="empolyee-add-page">
                <EmpolyeeEdit></EmpolyeeEdit>
            </PageDetail>
        );
    }
}