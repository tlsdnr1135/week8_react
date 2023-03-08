import React, { useState } from 'react';
import useLoginStore from '../zustandStore';
import { useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Button, Divider, Menu, MenuProps, Space, Tabs, TabsProps } from 'antd';

const advItems: MenuProps['items'] = [
    {
        label: '광고 등록',
        key: 'regAd',
        // danger: true,
        icon: <i className="ico ico-menu-01" />,
    },
    {
        label: '광고 관리',
        key: 'manageAd',
        icon: <i className="ico ico-menu-02" />,
    },
];
const adminItems: MenuProps['items'] = [
    {
        label: '광고 검수',
        key: 'app',
        icon: <i className="ico ico-menu-02" />,
    },
];

export const Headers = () => {
    const { token, isLogined, role, setLoginedHandler, setLogoutHandler } = useLoginStore();
    const [current, setCurrent] = useState('regAd');
    console.log('커렌트', current);
    let navigate = useNavigate();

    const moveAdvPage = (e: any) => {
        console.log(e.key);
        setCurrent(e.key);
        if ('regAd' === e.key) {
            navigate('/regad', { replace: false });
        } else {
            navigate('/managead', { replace: false });
        }
    };
    const moveAdminPage = () => {};
    const Logout = () => {
        setLogoutHandler();
        localStorage.clear();
        navigate('/login', { replace: true });
    };
    console.log('헤더 = ', role);

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
                            <span className="fz-16 fc-gray-300">
                                {/*{sessionStorage.getItem('id')}*/}
                            </span>
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
