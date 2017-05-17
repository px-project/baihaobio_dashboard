/**
 * service detail page.
 */
import React from 'react';
import { PageDetail, xhttp, Loader, FieldMap, ButtonGroup } from '../../../common';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class ServiceDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { detail: {}, loading: false };
    }

    componentWillMount() {
        this.setState({ loading: true });

        xhttp.get('/service/sortList')
            .then(sorts => {
                return xhttp.get('/service/detail/_id/' + this.props.match.params.service_id)
                    .then(service => {
                        sorts.forEach(sort => {
                            if (sort.id === service.sortId) service.sort = sort;
                            this.setState({ detail: service, loading: false });
                        });
                    });
            });
    }

    render() {
        let { loading, detail = {} } = this.state;
        return (
            <PageDetail className="service-detail-page">
                <Loader loading={ loading }>
                    <FieldMap name="服务名称">{ detail.title }</FieldMap>
                    <FieldMap name="类型">{ detail.sortTitle }({ detail.type === '1' ? '普通服务' : '特色服务' })</FieldMap>
                    <FieldMap name="概述">{ detail.shortDesc }</FieldMap>

                    { detail.type === '1' ? (
                        <div>
                            <FieldMap name="项目简介" type="rich">{ detail.description }</FieldMap>
                            <FieldMap name="实验流程" type="rich">{ detail.experimentFlow }</FieldMap>
                            <FieldMap name="用户须知" type="rich">{ detail.userNotice }</FieldMap>
                            <FieldMap name="结果展示" type="rich">{ detail.resultShow }</FieldMap>
                            <FieldMap name="服务周期" type="rich">{ detail.serverCircle }</FieldMap>
                        </div>
                    ) : '' }

                    { detail.type === '2' ? (
                        <div>
                            <FieldMap name="项目简介" type="rich">{ detail.description }</FieldMap>
                            <FieldMap name="实验原理" type="rich">{ detail.experimentTheory }</FieldMap>
                            <FieldMap name="项目优势" type="rich">{ detail.advantage }</FieldMap>
                            <FieldMap name="实验流程" type="rich">{ detail.experimentFlow }</FieldMap>
                            <FieldMap name="结果展示" type="rich">{ detail.resultShow }</FieldMap>
                            <FieldMap name="服务周期" type="rich">{ detail.serverCircle }</FieldMap>
                            <FieldMap name="参考文献" type="rich">{ detail.literature }</FieldMap>
                            <FieldMap name="客户须知" type="rich">{ detail.userNotice }</FieldMap>
                        </div>
                    ) : '' }
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={ `/service/${detail.id}/edit` }>编辑</Link>
                        </Button>
                    </ButtonGroup>
                </Loader>
            </PageDetail>
        );
    }
}
