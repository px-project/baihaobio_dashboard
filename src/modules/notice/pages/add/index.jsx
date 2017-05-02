/**
 * notice add page.
 */
import React from 'react';
import { NoticeEdit } from '../../components';
import { PageDetail } from '../../../common';

export class NoticeAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="notice-add-page">
                <NoticeEdit></NoticeEdit>
            </PageDetail>
        );
    }
}