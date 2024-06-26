import React from 'react';
import { Layout, Menu, Modal, message, theme } from 'antd';
import './style.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { menu } from './data/menu';
import { ExclamationCircleFilled, LogoutOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { confirm } = Modal;
const { Header, Content, Sider } = Layout;

export const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');

    if(!token){
        window.location.replace("/")
    }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = menu.map(item => ({
        key: item.id,
        icon: <item.icon />,
        label: item.name,
        onClick: () => navigate(item.path),
    }));

    const showConfirm = () => {
        confirm({
            title: 'Do you want to log out?',
            icon: <ExclamationCircleFilled/>,
            cancelText: 'No',
            onOk() {
                Cookies.remove("token")
                navigate("/");
                message.success("You logged out successfully!")
            }
        });
    };

    return (
        <Layout className='layout'>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <div className="logo">ADMIN</div>
                <LogoutOutlined onClick={showConfirm} style={{ fontSize: 20, color: "white" }} />
            </Header>
            <Layout className='sidebar'>
                <Sider className='sidebar_menu' theme='dark' width={200}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme='dark'
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '20px 20px 20px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            overflowY: 'auto',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            zIndex: 100
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
