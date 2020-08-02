import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import '../Register/Register.less'
import {LockOutlined, MailOutlined} from "@ant-design/icons/lib";
import ILoginForm from "../../../Interfaces/Auth/ILoginForm";
import AuthService from "../../../Services/AuthService";
import { useHistory } from 'react-router-dom';

const layout = {
    labelCol: { span: 10 }, //not being used
    wrapperCol: { offset: 0, span: 24 },
};

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

const Login = () => {
    const service = AuthService.getInstance();
    const history = useHistory();
    const onFinish = (values: any) => {
        const credentials = values as ILoginForm;
        service.login(credentials)
            .then(() => {
                if(service.isLoggedIn()) history.push('/app');
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="email"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                name="email"
                rules={[{ type: 'email', message: 'Please input your email' }]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Your email"/>
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Your password"/>
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
