import React from 'react';
import { Layout } from 'antd';
import './AuthLayout.less';
import { Route } from 'react-router-dom';
import Welcome from "../../Pages/Auth/Welcome";
import FooterLayout from "../_shared/FooterLayout";

const {  Content } = Layout;

function AuthLayout() {
    return (
        <Layout className="layout">
            <Content className="auth-content">
                <div className="site-layout-content">
                    <Route path="/auth" exact component={Welcome} />
                </div>
            </Content>
            <FooterLayout />
        </Layout>
    );
}

export default AuthLayout;
