import React from 'react';
import { Layout } from 'antd';
import './AuthLayout.less';
import { Route } from 'react-router-dom';
import Welcome from "../../Pages/Auth/Welcome";

const {  Content, Footer } = Layout;

function AuthLayout() {
    return (
        <Layout className="layout">
            <Layout.Header className="header">
                <div className="logo" />

            </Layout.Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Route path="/auth" exact component={Welcome} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default AuthLayout;
