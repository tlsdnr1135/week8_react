import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLoginStore, { useLoginState, useLoginAction } from '../store/useLoginStore';

const onFinish = (values: any) => {
    console.log('Received values of form:', values);
};

export const Login = () => {
    const { setLoginedHandler } = useLoginAction();
    const navigate = useNavigate();

    const loginForm = {
        email: '',
        password: '',
    };

    let email = '';
    let password = '';

    const changeEmailForm = (e: any) => {
        email = e.target.value;
        console.log(email);
    };
    const changePasswordForm = (e: any) => {
        password = e.target.value;
        console.log(password);
    };
    const loginEvent = () => {
        console.log('login_post');
        console.log(email);
        console.log(password);
        axios({
            method: 'POST', //post
            url: `http://localhost:8080/api/account/login`,
            data: {
                name: email,
                password: password,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('통신 성공');
                //로그인 토큰 저장
                localStorage.setItem('ACCESS_TOKEN', response.headers.imsulbinheader);
                localStorage.setItem('ROLE_GROUP', response.headers.role_group);
                localStorage.setItem('ID', email);

                setLoginedHandler(email);

                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="wrap login">
                <div className="box-inner">
                    <div className="box-left">
                        <div className="box-top">
                            <div className="logo">NHNAD Bidding Solution</div>
                            <div className="logo-sub">NHNAD 자동입찰 솔루션 로그인</div>
                        </div>
                        <div className="box-middle">
                            <div className="company-name">
                                <i className="ico ico-check"></i>
                                <span className="txt-company">DB손해보험</span>
                            </div>
                            <Input
                                name="email"
                                placeholder="아이디를 입력해주세요."
                                size="large"
                                prefix={<i className="ico ico-id"></i>}
                                defaultValue={loginForm.email}
                                onChange={changeEmailForm}
                            />
                            <Input.Password
                                name="password"
                                placeholder="비밀번호를 입력해주세요."
                                size="large"
                                prefix={<i className="ico ico-pw"></i>}
                                defaultValue={loginForm.password}
                                onChange={changePasswordForm}
                                // onPressEnter={loginEvent}
                            />
                            {/*{loginFail && (*/}
                            {/*    <p className="txt-error show">*/}
                            {/*        아이디 또는 비밀번호가 일치하지 않습니다.*/}
                            {/*    </p>*/}
                            {/*)}*/}
                        </div>
                        <div className="box-bottom">
                            <Button
                                type="primary"
                                className="pink"
                                size="large"
                                block
                                onClick={loginEvent}
                            >
                                로그인
                            </Button>
                        </div>
                    </div>
                    <div className="box-right">
                        <img
                            src={require('../images/img-login-object.jpg')}
                            alt="NBS 솔루션 화면 이미지"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
