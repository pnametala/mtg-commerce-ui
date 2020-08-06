import React, {useState} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './MyStoreLayout.less';
import FooterLayout from "../_shared/FooterLayout";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons/lib";
import SubMenu from "antd/lib/menu/SubMenu";
import {Redirect, Route, Switch, useRouteMatch} from "react-router";
import Dashboard from "../../Pages/MyStore/Dashboard/Dashboard";
import {Link} from "react-router-dom";
import MyCollection from "../../Pages/MyStore/MyCollection/MyCollection";

const { Header, Content, Sider } = Layout;


const MyStoreLayout = () => {
    const {path, url} = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to={`${url}/dashboard`}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to={`${url}/collection`}>My Collection</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Switch>
                            <Route path={`${path}/dashboard`} exact component={Dashboard} />
                            <Route path={`${path}/collection`} exact component={MyCollection} />
                            <Redirect to={`${path}/dashboard`}/>
                        </Switch>
                    </div>
                </Content>
                <FooterLayout></FooterLayout>
            </Layout>
        </Layout>
    );
}

export default MyStoreLayout;
