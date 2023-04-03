import React from 'react';
import { Headers } from '../component/common/Headers';
import { Footers } from '../component/common/Footers';
import { Outlet } from 'react-router-dom';

export const Admin = () => {
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
