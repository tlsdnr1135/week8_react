import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ConfirmAd } from './component/confirm/confirmAd';
import { ConfirmKeyword } from './component/confirm/confirmKeyword';
import { CurrentStateAd } from './component/confirm/currentStateAd';
import { ManageBulk } from './component/confirm/manageBulk';
import { ManageAd } from './component/manage/manageAd';
import { ManageAgroup } from './component/manage/manageAgroup';
import { ManageItem } from './component/manage/manageItem';
import { Admin } from './pages/admin';

import { Confirm } from './pages/admin/confirm';
import Adv from './pages/adv';
import { EnhencedRegAd } from './pages/adv/enhencedRegAd';
import { Manage } from './pages/adv/manage';
import { Login } from './pages/login';
import useLoginStore from './store/useLoginStore';

export const App = () => {
    const { role, setLogined } = useLoginStore();

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
                    {/* 로그인 했을 때 */}
                    {role === 'ROLE_ADV' && (
                        <Route element={<Adv />}>
                            <Route path="/regad" element={<EnhencedRegAd />} />
                            <Route element={<Manage />}>
                                <Route path="/managead" element={<ManageAd />} />
                                <Route path="/manageagroup" element={<ManageAgroup />} />
                                <Route path="/manageitem" element={<ManageItem />} />
                            </Route>
                            <Route path="/*" element={<Navigate replace to="/regad" />} />
                        </Route>
                    )}
                    {role === 'ROLE_ADMIN' && (
                        <Route element={<Admin />}>
                            <Route element={<Confirm />}>
                                <Route path={'/confirmkeyword'} element={<ConfirmKeyword />} />
                                <Route path={'/confirmad'} element={<ConfirmAd />} />
                                <Route path={'/currentstatead'} element={<CurrentStateAd />} />
                                <Route path={'/managebulk'} element={<ManageBulk />} />
                            </Route>
                            <Route path="/*" element={<Navigate replace to="/confirmkeyword" />} />
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
