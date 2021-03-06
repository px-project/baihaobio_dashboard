/**
 * login form component.
 */
import React from 'react';
import { Icon } from '../../../common';
import { Form, Button, Input } from 'antd';
const FormItem = Form.Item;
import './style.scss';

class loginForm extends React.Component {
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form" onSubmit={ this.submit.bind(this) }>
                <FormItem>
                    { getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(<Input prefix={ <Icon type="user" style={ { fontSize: 13 } } /> } placeholder="请输入账号" />) }
                </FormItem>
                <FormItem>
                    { getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(<Input prefix={ <Icon type="lock" style={ { fontSize: 13 } } /> } type="password" placeholder="Password" />) }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                </FormItem>
            </Form>
        );
    }
    submit(e) {
        e.preventDefault();
        let { form, login } = this.props;
        form.validateFields((err, values) => {
            if (err) return;
            login(values);
        });
    }
}


export const LoginForm = Form.create()(loginForm);