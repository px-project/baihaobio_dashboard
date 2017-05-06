/**
 * edit news component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor, Upload } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _newsEdit extends React.Component {

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

                <FormItem label="标题" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('title', {
                        rules: [
                            { required: true, message: '请输入标题' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="封面" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('photo', {
                        rules: [
                            { required: true, message: '请上传封面' }
                        ]
                    })(<Upload></Upload>) }
                </FormItem>

                <FormItem label="简介" labelCol={ { span: 4 } } wrapperCol={ { span: 12 } }>
                    { getFieldDecorator('shortDesc', {
                        rules: []
                    })(<Input type="textarea" rows={ 6 }></Input>) }
                </FormItem>

                <FormItem label="新闻详情" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('content', {
                        rules: []
                    })(<Editor id="content"></Editor>) }
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

export const NewsEdit = Form.create()(_newsEdit);