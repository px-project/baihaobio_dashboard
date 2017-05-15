/**
 * service edit form component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _serviceEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = { type: '' };
    }

    selectType(type, sort_id = '') {
        this.props.form.setFieldsValue({ sortId: sort_id });
        this.setState({ type: type });
    }

    componentWillMount(props) {
        let { init = {}, types } = this.props;
        if (init.id && !this.state.type) {
            types.forEach(type => {
                if (type.id === init.sortId) this.setState({ type: type.type });
            });
        }
    }

    render() {
        let { form, types = [], init = {} } = this.props, { getFieldDecorator } = form;

        return (
            <Form onSubmit={ this.submit.bind(this) }>

                <FormItem label="服务名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('title', {
                        initialValue: init.title,
                        rules: [
                            { required: true, message: '请输入服务名称' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="类型" labelCol={ { span: 4 } } wrapperCol={ { span: 10 } }>
                    <Select placeholder="请选择类型" value={ this.state.type || undefined } style={ { width: 200 } } onChange={ this.selectType.bind(this) }>
                        <Option value={ "1" }>普通服务</Option>
                        <Option value={ "2" }>特色服务</Option>
                    </Select>
                    { getFieldDecorator('sortId', {
                        initialValue: this.state.type ? init.sortId : undefined,
                        rules: [
                            { required: true, message: '请选择服务类型' }
                        ]
                    })(
                        <Select placeholder="请选择服务" disabled={ !this.state.type } style={ { width: 200, marginLeft: 20 } }>
                            { types.filter(item => item.type === this.state.type).map((type, index) => (
                                <Option value={ type.id } key={ index }>{ type.title }</Option>
                            )) }
                        </Select>) }
                </FormItem>

                <FormItem label="概述" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('shortDesc', {
                        initialValue: init.shortDesc,
                        rules: []
                    })(<Input type="textarea" rows={ 6 }></Input>) }
                </FormItem>

                {/* 普通 */ }
                { this.state.type === '1' ? (
                    <div className="basic">
                        <FormItem label="项目简介" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('description', {
                                initialValue: 'description',
                                rules: []
                            })(<Editor id="basic-description"></Editor>) }
                        </FormItem>
                        <FormItem label="实验流程" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('experimentFlow', {
                                initialValue: 'experimentFlow',
                                rules: []
                            })(<Editor id="basic-flow"></Editor>) }
                        </FormItem>
                        <FormItem label="用户须知" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('userNotice', {
                                initialValue: 'userNotice',
                                rules: []
                            })(<Editor id="basic-user"></Editor>) }
                        </FormItem>
                        <FormItem label="结果展示" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('resultShow', {
                                initialValue: 'resultShow',
                                rules: []
                            })(<Editor id="basic-result"></Editor>) }
                        </FormItem>
                        <FormItem label="服务周期" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('serverCircle', {
                                initialValue: 'serverCircle',
                                rules: []
                            })(<Editor id="basic-circle"></Editor>) }
                        </FormItem>
                    </div>
                ) : '' }

                {/* 特色 */ }
                { this.state.type === '2' ? (
                    <div className="spec">
                        <FormItem label="项目简介" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('description', {
                                initialValue: 'description',
                                rules: []
                            })(<Editor id="spec-description"></Editor>) }
                        </FormItem>
                        <FormItem label="实验原理" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('experimentTheory', {
                                initialValue: 'experimentTheory',
                                rules: []
                            })(<Editor id="spec-exper"></Editor>) }
                        </FormItem>
                        <FormItem label="项目优势" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('advantage', {
                                initialValue: 'advantage',
                                rules: []
                            })(<Editor id="spec-advantage"></Editor>) }
                        </FormItem>
                        <FormItem label="实验流程" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('experimentFlow', {
                                initialValue: 'experimentFlow',
                                rules: []
                            })(<Editor id="spec-flow"></Editor>) }
                        </FormItem>
                        <FormItem label="结果展示" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('resultShow', {
                                initialValue: 'resultShow',
                                rules: []
                            })(<Editor id="spec-result"></Editor>) }
                        </FormItem>
                        <FormItem label="服务周期" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('serverCircle', {
                                initialValue: 'serverCircle',
                                rules: []
                            })(<Editor id="spec-server"></Editor>) }
                        </FormItem>
                        <FormItem label="参考文献" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('literature', {
                                initialValue: 'literature',
                                rules: []
                            })(<Editor id="spec-literature"></Editor>) }
                        </FormItem>
                        <FormItem label="客户须知" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                            { getFieldDecorator('userNotice', {
                                initialValue: 'userNotice',
                                rules: []
                            })(<Editor id="spec-user"></Editor>) }
                        </FormItem>
                    </div>
                ) : '' }

                <FormItem wrapperCol={ { span: 12, offset: 4 } }>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button type="danger">
                        <Link to="/service">取消</Link>
                    </Button>
                </FormItem>
            </Form>
        );
    }

    submit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (err) return;
            this.props.submit(data);
        });
    }

}

export const ServiceEdit = Form.create()(_serviceEdit);