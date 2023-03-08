import React, { useEffect, useState } from 'react';
import { Login } from './pages/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import Adv from './pages/Adv';
import { create, useStore } from 'zustand';
import useLoginStore from './zustandStore';
import { RegAd } from './component/RegAd';
import { ManageAd } from './component/ManageAd';

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

    console.log('roles  = ', role);
    console.log('isLogined = ', isLogined);
    return (
        <>
            {isLogined ? (
                <Routes>
                    //로그인 했을 때
                    <Route element={<Adv />}>
                        <Route path="/regad" element={<RegAd />} />
                        <Route path="/managead" element={<ManageAd />} />
                        <Route path="/*" element={<Navigate replace to="/regad" />} />
                    </Route>
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
