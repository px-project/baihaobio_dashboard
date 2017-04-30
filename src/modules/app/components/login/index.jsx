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
                    { getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<Input prefix={ <Icon type="user" style={ { fontSize: 13 } } /> } placeholder="Username" />) }
                </FormItem>
                <FormItem>
                    { getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
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
        form.validateFields((err, values) => login(values));
    }
}


export const LoginForm = Form.create()(loginForm);