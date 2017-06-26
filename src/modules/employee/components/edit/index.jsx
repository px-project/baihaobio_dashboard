/**
 * edit employee component.
 */
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Editor, Upload } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class _employeeEdit extends React.Component {
	render() {
		let { form, init = {}, saving } = this.props, { getFieldDecorator } = form;
		return (
			<Form onSubmit={ this.submit.bind(this) }>

				<FormItem label="姓名" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('name', {
						initialValue: init.name,
						rules: [
							{ required: true, message: '请输入姓名' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="职位" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('position', {
						initialValue: init.position,
						rules: [
							{ required: true, message: '请输入职位' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="邮箱" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('email', {
						initialValue: init.email,
						rules: []
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="联系方式" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('telephone', {
						initialValue: init.telephone,
						rules: []
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="头像" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('photo', {
						initialValue: init.photo,
						rules: []
					})(<Upload></Upload>) }
				</FormItem>

				<FormItem label="简介" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('description', {
						initialValue: init.description,
						rules: []
					})(<Editor id="description"></Editor>) }
				</FormItem>

				<FormItem label="研究方向" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('study', {
						initialValue: init.study,
						rules: []
					})(<Editor id="study"></Editor>) }
				</FormItem>

				<FormItem label="文献" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('thesis', {
						initialValue: init.thesis,
						rules: []
					})(<Editor id="thesis"></Editor>) }
				</FormItem>

				<FormItem wrapperCol={ { span: 12, offset: 4 } }>
					<Button type="primary" htmlType="submit" loading={ saving }>保存</Button>
					<Button type="danger">
						<Link to="/employee">取消</Link>
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

export const EmployeeEdit = Form.create()(_employeeEdit);