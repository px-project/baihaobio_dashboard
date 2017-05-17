/**
 * notice detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class NoticeDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/notice/detail/_id/' + this.props.match.params.notice_id)
            .then(notice => this.setState({ detail: notice, loading: false }));
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="notice-detail-page">
                <Loader loading={ loading }>
                    <FieldMap name="中文内容">{ detail.content }</FieldMap>
                    <FieldMap name="英文内容">{ detail.englishContent }</FieldMap>
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/notice/${detail.id}/edit` }>编辑</Link>
                        </Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
