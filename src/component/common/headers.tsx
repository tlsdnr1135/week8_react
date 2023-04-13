import type { MenuProps } from 'antd';
import { Button, Divider, Menu, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLoginStore from '../../store/useLoginStore';

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
        label: '키워드 검수',
        key: '/confirmkeyword',
        icon: <i className="ico ico-menu-01" />,
    },
    {
        label: '광고 검수',
        key: '/confirmad',
        icon: <i className="ico ico-menu-02" />,
    },
    {
        label: '대량 관리',
        key: '/managebulk',
        icon: <i className="ico ico-menu-02" />,
    },
    {
        label: '광고 현황',
        key: '/currentstatead',
        icon: <i className="ico ico-menu-01" />,
    },
];

export const Headers = () => {
    const url = useLocation();
    const { role, setLogoutHandler } = useLoginStore();
    const [current, setCurrent] = useState('/');
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
                setCurrent('/manageitem');
                break;
            case '/confirmkeyword':
                setCurrent('/confirmkeyword');
                break;
            case '/confirmad':
                setCurrent('/confirmad');
                break;
            case '/managebulk':
                setCurrent('/managebulk');
                break;
            case '/currentstatead':
                setCurrent('/currentstatead');
                break;
        }
    }, [url]);

    const moveAdvPage = (e: any) => {
        setCurrent(e.key);
        navigate(e.key);
    };
    const moveAdminPage = (e: any) => {
        setCurrent(e.key);
        navigate(e.key);
    };
    const Logout = () => {
        setLogoutHandler();
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    return (
        <>
            <Header>
                <a className="logo">
                    <span>NHNAD</span> Bidding Solution
                </a>
                {role === 'ROLE_ADV' && (
                    <Menu
                        onClick={moveAdvPage}
                        defaultOpenKeys={['/regAd']}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={advItems}
                    />
                )}
                {role === 'ROLE_ADMIN' && (
                    <Menu
                        onClick={moveAdminPage}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={adminItems}
                    />
                )}
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
