import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Adv from './pages/Adv';
import useLoginStore from './store/useLoginStore';
import { RegAd } from './pages/adv/RegAd';
import { ManageAd } from './pages/adv/ManageAd';

import { Sample } from './pages/admin/Sample';
import { EnhencedRegAd } from './pages/adv/EnhencedRegAd';
import { Admin } from './pages/Admin';

export const App = () => {
    const { token, isLogined, role, setLogined } = useLoginStore();

    const gettoke = localStorage.getItem('ACCESS_TOKEN') as string;
    const userIsLoggedIn = !!gettoke;

    useEffect(() => {
        if (userIsLoggedIn) {
            //토큰이 있으면
            setLogined(userIsLoggedIn); //토큰값과 롤 저장하기
        } else {
            console.log('익명 사용자 : ', role, '입니다');
        }
    }, []);

    console.log('APP');
    return (
        <>
            {userIsLoggedIn ? (
                <Routes>
                    //로그인 했을 때
                    {role === 'ROLE_ADV' && (
                        <Route element={<Adv />}>
                            {/*<Route path="/regad" element={<RegAd />} />*/}
                            <Route path="/regad" element={<EnhencedRegAd />} />
                            <Route path="/managead" element={<ManageAd />} />
                            <Route path="/*" element={<Navigate replace to="/regad" />} />
                        </Route>
                    )}
                    {role === 'ROLE_ADMIN' && (
                        <Route element={<Admin />}>
                            <Route path="/admin" element={<Sample />} />
                            <Route path="/*" element={<Navigate replace to="/admin" />} />
                        </Route>
                    )}
                </Routes>
            ) : (
                //비로그인
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Navigate replace to="/login" />} />
                </Routes>
            )}
        </>
    );
};

export default App;
