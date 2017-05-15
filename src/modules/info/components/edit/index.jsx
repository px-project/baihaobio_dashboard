/**
 * edit info component.
 */
import React from 'react';
import { Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Upload } from '../../../common';
const FormItem = Form.Item;
import './style.scss';

class _infoEdit extends React.Component {

    render() {
        let { form, init = {} } = this.props, { getFieldDecorator } = form;

        return (
            <Form onSubmit={ this.submit.bind(this) }>

                <FormItem label="公司名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('name', {
                        initialValue: init.name,
                        rules: [
                            { required: true, message: '请输入公司名称' }
                        ]
                    })(<Input></Input>) }
                </FormItem>

                <FormItem label="外景" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
                    { getFieldDecorator('photo', {
                        initialValue: init.photo,
                        rules: [
                            { required: true, message: '请上传外景' }
                        ]
                    })(<Upload></Upload>) }
                </FormItem>

                <FormItem label="介绍" labelCol={ { span: 4 } } wrapperCol={ { span: 12 } }>
                    { getFieldDecorator('information', {
                        initialValue: init.information,
                        rules: []
                    })(<Input type="textarea" rows={ 10 }></Input>) }
                </FormItem>

                <FormItem wrapperCol={ { span: 12, offset: 4 } }>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button type="danger">
                        <Link to="/info">取消</Link>
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

export const InfoEdit = Form.create()(_infoEdit);