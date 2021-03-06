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
		let { form, init = {}, saving } = this.props, { getFieldDecorator } = form;
		return (
			<Form onSubmit={ this.submit.bind(this) }>

				<FormItem label="标题" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('title', {
						initialValue: init.title,
						rules: [
							{ required: true, message: '请输入标题' }
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

				<FormItem label="简介" labelCol={ { span: 4 } } wrapperCol={ { span: 12 } }>
					{ getFieldDecorator('shortDesc', {
						initialValue: init.shortDesc,
						rules: []
					})(<Input type="textarea" rows={ 6 }></Input>) }
				</FormItem>

				<FormItem label="新闻详情" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('content', {
						initialValue: init.content,
						rules: []
					})(<Editor id="content" height={ 500 }></Editor>) }
				</FormItem>

				<FormItem wrapperCol={ { span: 12, offset: 4 } }>
					<Button type="primary" htmlType="submit" loading={ saving }>保存</Button>
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

export const NewsEdit = Form.create()(_newsEdit);