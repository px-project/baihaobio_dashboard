/**
 * laboratory edit form component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
import { Upload, Demand } from '../../../common';
import './style.scss';

class _laboratoryEdit extends React.Component {

    render() {
        let { form, init = {} } = this.props, { getFieldDecorator } = form;

        return (
            <Form onSubmit={ this.submit.bind(this) }>

                <FormItem label="名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('name', {
                        initialValue: init.name,
                        rules: [
                            { required: true, message: '请输入名称' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="封面" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('photo', {
                        initialValue: init.photo,
                        rules: [
                            { required: true, message: '请上传封面' }
                        ]
                    })(<Upload></Upload>) }
                </FormItem>

                <FormItem label="简述" labelCol={ { span: 4 } } wrapperCol={ { span: 14 } }>
                    { getFieldDecorator('number', {
                        initialValue: init.number,
                        rules: []
                    })(<Input type="textarea" rows={ 6 }></Input>) }
                </FormItem>

                <FormItem label="图片墙" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('photoDetailUrl', {
                        initialValue: init.demand || [],
                        rules: []
                    })(<Demand></Demand>) }
                </FormItem>

                <FormItem wrapperCol={ { span: 12, offset: 4 } }>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button type="danger">
                        <Link to="/laboratory">取消</Link>
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

export const LaboratoryEdit = Form.create()(_laboratoryEdit);