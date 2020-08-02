import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link, Route} from 'react-router-dom';
import FooterLayout from "../_shared/FooterLayout";
import AuthService from "../../Services/AuthService";

const { Header, Content } = Layout;

const Home = () => <p>Home</p>;
const Dashboard = () => <p>Dashboard</p>;
function AppLayout() {
    const service = AuthService.getInstance();
    service.getUsers();
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/app/home">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/app/dashboard">Dashboard</Link></Menu.Item>
                </Menu>
            </Header>
            <Content>
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
            <FooterLayout />
        </Layout>
    );
}

export default AppLayout;
