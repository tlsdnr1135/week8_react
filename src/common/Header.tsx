import React, { useState } from 'react';
import useLoginStore from '../zustandStore';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const { token, isLogined, role, setLoginedHandler, setLogoutHandler } = useLoginStore();
    let navigate = useNavigate();
    const Logout = () => {
        setLogoutHandler();
        localStorage.clear();
        navigate('/login', { replace: true });
    };
    return (
        <>
            <header className="ant-layout-header css-dev-only-do-not-override-1me4733">
                <a className="logo">
                    <span>NHNAD</span> Bidding Solution
                </a>
                <ul
                    className="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-light css-dev-only-do-not-override-1me4733"
                    role="menu"
                    tabIndex={0}
                    data-menu-list="true"
                >
                    <li
                        className="ant-menu-overflow-item ant-menu-item ant-menu-item-selected"
                        role="menuitem"
                        tabIndex={-1}
                        data-menu-id="rc-menu-uuid-10651-2-adReg"
                        style={{ opacity: '1', order: '0' }}
                    >
                        <i className="ico ico-menu-01 ant-menu-item-icon"></i>
                        <span className="ant-menu-title-content">광고 등록</span>
                    </li>
                    <li
                        className="ant-menu-overflow-item ant-menu-item"
                        role="menuitem"
                        tabIndex={-1}
                        data-menu-id="rc-menu-uuid-10651-2-adMng"
                        style={{ opacity: '1', order: '1' }}
                    >
                        <i className="ico ico-menu-02 ant-menu-item-icon"></i>
                        <span className="ant-menu-title-content">광고 관리</span>
                    </li>
                    <li
                        className="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal ant-menu-submenu-disabled"
                        aria-hidden="true"
                        role="none"
                        style={{
                            opacity: '0',
                            height: '0px',
                            overflowY: 'hidden',
                            order: '2147483647',
                            pointerEvents: 'none',
                            position: 'absolute',
                        }}
                    >
                        <div
                            role="menuitem"
                            className="ant-menu-submenu-title"
                            aria-expanded="false"
                            aria-haspopup="true"
                            data-menu-id="rc-menu-uuid-10651-2-rc-menu-more"
                            aria-controls="rc-menu-uuid-10651-2-rc-menu-more-popup"
                            aria-disabled="true"
                        >
                            <span
                                role="img"
                                aria-label="ellipsis"
                                className="anticon anticon-ellipsis"
                            >
                                <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="ellipsis"
                                    width="1em"
                                    height="1em"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path>
                                </svg>
                            </span>
                            <i className="ant-menu-submenu-arrow"></i>
                        </div>
                    </li>
                </ul>
                <div aria-hidden="true" style={{ display: 'none' }}></div>
                <div className="user-info">
                    <div
                        className="ant-space css-dev-only-do-not-override-1me4733 ant-space-horizontal ant-space-align-center"
                        style={{ gap: '8px' }}
                    >
                        <div className="ant-space-item" style={{}}>
                            <div
                                className="ant-space css-dev-only-do-not-override-1me4733 ant-space-horizontal ant-space-align-center"
                                style={{ gap: '8px' }}
                            >
                                <div className="ant-space-item" style={{}}>
                                    <i className="ico ico-user-info"></i>
                                </div>
                                <div className="ant-space-item">
                                    <span className="fz-16 fc-gray-300">adv</span>
                                </div>
                            </div>
                        </div>
                        <span className="ant-space-item-split" style={{}}>
                            <div
                                className="ant-divider css-dev-only-do-not-override-1me4733 ant-divider-vertical"
                                role="separator"
                            ></div>
                        </span>
                        <div className="ant-space-item">
                            <button
                                type="button"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm gray"
                                onClick={Logout}
                            >
                                <span>로그아웃</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
