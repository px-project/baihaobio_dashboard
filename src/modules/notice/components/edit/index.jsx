/**
 * edit notice component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _noticeEdit extends React.Component {

	render() {
		let { form, types, init = {}, saving } = this.props, { getFieldDecorator } = form;

		return (
			<Form onSubmit={ this.submit.bind(this) }>

				<FormItem label="中文内容" labelCol={ { span: 4 } } wrapperCol={ { span: 12 } }>
					{ getFieldDecorator('content', {
						initialValue: init.content,
						rules: [
							{ required: true, message: '请输入中文内容' }
						]
					})(<Input type="textarea" rows={ 6 }></Input>) }
				</FormItem>

				<FormItem label="英文内容" labelCol={ { span: 4 } } wrapperCol={ { span: 12 } }>
					{ getFieldDecorator('englishContent', {
						initialValue: init.englishContent,
						rules: [
							{ required: true, message: '请输入英文内容' }
						]
					})(<Input type="textarea" rows={ 6 }></Input>) }
				</FormItem>

				<FormItem wrapperCol={ { span: 12, offset: 4 } }>
					<Button type="primary" htmlType="submit" loading={ saving }>保存</Button>
					<Button type="danger">
						<Link to="/notice">取消</Link>
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

export const NoticeEdit = Form.create()(_noticeEdit);