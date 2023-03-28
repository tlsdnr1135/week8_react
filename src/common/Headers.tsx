import React, { useEffect, useState } from 'react';
import useLoginStore from '../store/useLoginStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Button, Divider, Menu, MenuProps, Space, Tabs, TabsProps } from 'antd';

const advItems: MenuProps['items'] = [
    {
        label: '광고 등록',
        key: '/regad',
        // danger: true,
        icon: <i className="ico ico-menu-01" />,
    },
    {
        label: '광고 관리',
        key: '/managead',
        icon: <i className="ico ico-menu-02" />,
    },
];
const adminItems: MenuProps['items'] = [
    {
        label: '광고 검수',
        key: '/app',
        icon: <i className="ico ico-menu-02" />,
    },
];

export const Headers = () => {
    const url = useLocation();
    const { role, setLogoutHandler } = useLoginStore();
    const [current, setCurrent] = useState('/regad');
    const navigate = useNavigate();

    useEffect(() => {
        switch (url.pathname) {
            case '/regad':
                setCurrent('/regad');
                break;
            case '/managead':
                setCurrent('/managead');
                break;
            case '/manageagroup':
                setCurrent('/managead');
                break;
            case '/manageitem':
                setCurrent('/managead');
                break;
            // default:
            //     setCurrent('/regad');
            //     break;
        }
    }, []);

    const moveAdvPage = (e: any) => {
        setCurrent(e.key);
        navigate(e.key);
    };
    const moveAdminPage = () => {};
    const Logout = () => {
        setLogoutHandler();
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <Header className="ant-layout-header css-dev-only-do-not-override-1me4733">
                <a className="logo">
                    <span>NHNAD</span> Bidding Solution
                </a>
                {role === 'ROLE_ADV' && (
                    <Menu
                        className="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-light css-dev-only-do-not-override-1me4733"
                        onClick={moveAdvPage}
                        defaultOpenKeys={['regAd']}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={advItems}
                    />
                )}
                {role === 'ROLE_ADMIN' && (
                    <Menu
                        onClick={() => navigate('/regadd', { replace: true })}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={adminItems}
                    />
                )}
                <div aria-hidden="true" style={{ display: 'none' }}></div>
                <div className="user-info">
                    <Space split={<Divider type="vertical" />}>
                        <Space>
                            <i className="ico ico-user-info"></i>
                            <span className="fz-16 fc-gray-300">{localStorage.getItem('ID')}</span>
                        </Space>
                        <Button className="gray" size="small" onClick={Logout}>
                            로그아웃
                        </Button>
                    </Space>
                </div>
            </Header>
        </>
    );
};
