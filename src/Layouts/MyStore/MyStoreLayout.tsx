import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './MyStoreLayout.less';
import FooterLayout from "../_shared/FooterLayout";
import ScryfallService from "../../Services/StryfallService";

const { Header, Content } = Layout;


const MyStoreLayout = () => {

    const service = new ScryfallService();
    service.getCardNames();
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    Admin Content
                </div>
            </Content>
            <FooterLayout />
        </Layout>
    );
}

export default MyStoreLayout;
