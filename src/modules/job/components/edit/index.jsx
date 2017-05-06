/**
 * job edit form component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _jobEdit extends React.Component {

    render() {
        let { form, types } = this.props, { getFieldDecorator } = form;

        return (
            <Form onSubmit={ this.submit.bind(this) }>

                <FormItem label="实验室名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('lab', {
                        rules: [
                            { required: true, message: '请输入实验室名称' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="招聘职位" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('station', {
                        rules: [
                            { required: true, message: '请输入招聘职位' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="招聘人数" labelCol={ { span: 4 } } wrapperCol={ { span: 4 } }>
                    { getFieldDecorator('number', {
                        rules: [
                            { required: true, message: '请输入招聘人数' }
                        ]
                    })(<Input type="number"></Input>) }
                </FormItem>

                <FormItem label="岗位要求" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('demand', {
                        rules: []
                    })(<Input></Input>) }
                </FormItem>

                <FormItem wrapperCol={ { span: 12, offset: 4 } }>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button type="danger">
                        <Link to="/job">取消</Link>
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

export const JobEdit = Form.create()(_jobEdit);