/**
 * job edit form component.
 */
import React from 'react';
import { Form, Button, Input, Select, InputNumber, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Editor } from '../../../common';
const FormItem = Form.Item;
const { Option } = Select;
import './style.scss';

class Demand extends React.Component {
	add() {
		let { value, onChange } = this.props;
		onChange(value.concat(['']));
	}

	remove(index) {
		let { value, onChange } = this.props;
		onChange(value.filter((item, _index) => _index !== index));
	}

	render() {
		let { value = [], form } = this.props, { getFieldDecorator } = form;
		return (
			<div className="demand-edit">
				<ul>
					{ value.map((item, index) =>
						<li key={ index }>
							<FormItem wrapperCol={ { span: 12 } }>
								{ getFieldDecorator(`demand[${index}]`, {
									initialValue: item,
									rules: [
										{ required: true, message: '请输入要求' }
									]
								})(<Input></Input>) }
							</FormItem>
							<Button type="dashed" onClick={ this.remove.bind(this, index) }>
								<Icon type="delete" />
							</Button>
						</li>
					) }
				</ul>
				<Button type="dashed" onClick={ this.add.bind(this) } style={ { width: '60%' } }>添加要求</Button>
			</div>
		);
	}
}

class _jobEdit extends React.Component {

	render() {
		let { form, init = {}, saving } = this.props, { getFieldDecorator } = form;

		return (
			<Form onSubmit={ this.submit.bind(this) }>

				<FormItem label="实验室名称" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('lab', {
						initialValue: init.lab,
						rules: [
							{ required: true, message: '请输入实验室名称' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="招聘职位" labelCol={ { span: 4 } } wrapperCol={ { span: 8 } }>
					{ getFieldDecorator('station', {
						initialValue: init.station,
						rules: [
							{ required: true, message: '请输入招聘职位' }
						]
					})(<Input></Input>) }
				</FormItem>

				<FormItem label="招聘人数" labelCol={ { span: 4 } } wrapperCol={ { span: 4 } }>
					{ getFieldDecorator('number', {
						initialValue: init.number,
						rules: [
							{ required: true, message: '请输入招聘人数' }
						]
					})(<InputNumber min={ 1 }></InputNumber>) }
				</FormItem>

				<FormItem label="岗位要求" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
					{ getFieldDecorator('demand', {
						initialValue: init.demand || [],
						rules: []
					})(<Demand form={ form }></Demand>) }
				</FormItem>

				<FormItem wrapperCol={ { span: 12, offset: 4 } }>
					<Button type="primary" htmlType="submit" loading={ saving }>保存</Button>
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