import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import '../Register/Register.less'

const layout = {
    labelCol: { span: 10 }, //not being used
    wrapperCol: { offset: 0, span: 24 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

const Login = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
            >
                <Input placeholder="Your email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password placeholder="Your password"/>
            </Form.Item>

            <Form.Item {...tailLayout} className="form-item-remember-me">
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
