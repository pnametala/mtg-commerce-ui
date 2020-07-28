import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './AppLayout.less';
import {Link, Route} from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const Home = () => <p>Home</p>;
const Dashboard = () => <p>Dashboard</p>;
function AppLayout() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/app/home">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/app/dashboard">Dashboard</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    Content
                    <Route path="/app/home" exact component={Home} />
                    <Route path="/app/dashboard" exact component={Dashboard} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}

export default AppLayout;
