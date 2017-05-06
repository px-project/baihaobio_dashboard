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

let uuid = 0;
class DynamicFieldSet extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                    label={ index === 0 ? 'Passengers' : '' }
                    required={ false }
                    key={ k }
                >
                    { getFieldDecorator(`names-${k}`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        }],
                    })(
                        <Input placeholder="passenger name" style={ { width: '60%', marginRight: 8 } } />
                        ) }
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={ keys.length === 1 }
                        onClick={ () => this.remove(k) }
                    />
                </FormItem>
            );
        });
        return (
            <Form onSubmit={ this.handleSubmit }>
                { formItems }
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={ this.add } style={ { width: '60%' } }></Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit" size="large">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}


class DemandItem extends React.Component {
    render() {
        let { remove } = this.props;
        return (
            <div className="demand-edit-item">
                <Input></Input>
                <Button type="dashed" onClick={ remove }>移除</Button>
            </div>
        );
    }
}

let a = 1;
class Demand extends React.Component {
    add() {
        let { value, onChange } = this.props;
        onChange(value.concat({ index: a++ }));
    }

    remove(item) {
        let { value, onChange } = this.props;
        onChange(value.filter((item, index) => index !== value.indexOf(item)));
    }


    render() {
        let { value = [] } = this.props;
        return (
            <div className="demand-edit">
                { value.map((item, index) => (
                    <DemandItem key={ index } remove={ this.remove.bind(this, item) }></DemandItem>
                )) }
                <Button type="dashed" onClick={ this.add.bind(this) } style={ { width: '60%' } }>添加要求</Button>
            </div>
        );
    }
}



class _jobEdit extends React.Component {

    render() {
        let { form, init = {} } = this.props, { getFieldDecorator } = form;

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
                    })(<Input type="number"></Input>) }
                </FormItem>

                <FormItem label="岗位要求" labelCol={ { span: 4 } } wrapperCol={ { span: 16 } }>
                    { getFieldDecorator('demand', {
                        initialValue: init.demand || [],
                        rules: []
                    })(<Demand></Demand>) }
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