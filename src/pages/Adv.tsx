import React from 'react';
import { Headers } from '../common/Headers';
import { Footers } from '../common/Footers';
import { Outlet } from 'react-router-dom';

export const Adv = () => {
    return (
        <>
            <section className="ant-layout layout css-dev-only-do-not-override-1me4733">
                <Headers></Headers>
                <Outlet></Outlet>
                <Footers></Footers>
            </section>
        </>
    );
};

export default Adv;
