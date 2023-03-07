import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Outlet } from 'react-router-dom';

export const Adv = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Adv;
