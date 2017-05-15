/**
 * notice detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class InfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });
        xhttp.get('/admin/company').then(info => this.setState({ detail: info, loading: false }));
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="info-page">
                <Loader loading={ loading }>
                    <FieldMap name="公司名称">{ detail.name }</FieldMap>
                    <FieldMap name="外景" type="image" url={ detail.photo }></FieldMap>
                    <FieldMap name="介绍">{ detail.information }</FieldMap>
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/info/edit` }>编辑</Link>
                        </Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
