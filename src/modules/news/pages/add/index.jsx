/**
 * news add page.
 */
import React from 'react';
import { NewsEdit } from '../../components';
import { PageDetail } from '../../../common';

export class NewsAddPage extends React.Component {
    render() {
        return (
            <PageDetail className="news-add-page">
                <NewsEdit></NewsEdit>
            </PageDetail>
        );
    }
}