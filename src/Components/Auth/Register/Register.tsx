import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons/lib";

const layout = {
    labelCol: { span: 10 }, //not being used
    wrapperCol: { offset: 0, span: 24 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};


const Register = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Your email" />
            </Form.Item>

            <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Your first name"/>
            </Form.Item>

            <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Your last name"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Your password" />
            </Form.Item>

            <Form.Item
                name="passwordConfirm"
                rules={[{ required: true, message: 'Please confirm your password' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
