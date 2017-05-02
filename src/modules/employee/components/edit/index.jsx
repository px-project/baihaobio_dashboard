/**
 * edit empolyee component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _empolyeeEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = { type: undefined };
    }

    selectType(type) {
        this.setState({ type: +type });
    }

    render() {
        let { form, types } = this.props, { getFieldDecorator } = form;

        return (
            <Form onSubmit={ this.submit.bind(this) }>

                <FormItem label="姓名" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入姓名' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="职位" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('position', {
                        rules: [
                            { required: true, message: '请输入职位' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="邮箱" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('email', {
                        rules: []
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="联系方式" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('telephone', {
                        rules: []
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="头像" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('photo', {
                        rules: []
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="简介" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('description', {
                        rules: []
                    })(<Editor id="description"></Editor>) }
                </FormItem>

                <FormItem label="研究方向" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('study', {
                        rules: []
                    })(<Editor id="study"></Editor>) }
                </FormItem>

                <FormItem label="文献" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('thesis', {
                        rules: []
                    })(<Editor id="thesis"></Editor>) }
                </FormItem>

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
            this.props.submit(data);
        });
    }

}

export const EmpolyeeEdit = Form.create()(_empolyeeEdit);