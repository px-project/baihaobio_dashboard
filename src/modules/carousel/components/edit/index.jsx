/**
 * edit carousel component.
 */
import React from 'react';
import { Form, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Upload, Editor } from '../../../common';
const FormItem = Form.Item;
import './style.scss';

class _carouselEdit extends React.Component {
	render() {
		let { form, init = {}, saving } = this.props, { getFieldDecorator } = form;
		return (
			<Form onSubmit={ this.submit.bind(this) }>

				<FormItem label="名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('title', {
						initialValue: init.title,
						rules: [
							{ required: true, message: '请输入名称' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="跳转链接" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('link', {
						initialValue: init.link,
						rules: [
							{ required: true, message: '请输入跳转链接' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="背景图" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('photo', {
						initialValue: init.photo,
						rules: [
							{ required: true, message: '请输入背景图' }
						]
					})(<Upload></Upload>) }
				</FormItem>

				<FormItem label="备注" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('description', {
						initialValue: init.description,
						rules: []
					})(<Input type="textarea" rows="10"></Input>) }
				</FormItem>

				<FormItem wrapperCol={ { span: 12, offset: 4 } }>
					<Button type="primary" htmlType="submit" loading={ saving }>保存</Button>
					<Button type="danger">
						<Link to="/carousel">取消</Link>
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

export const CarouselEdit = Form.create()(_carouselEdit);