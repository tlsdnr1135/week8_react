import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footers } from '../component/common/footers';
import { Headers } from '../component/common/headers';

export const Admin = () => {
    return (
        <>
            <Layout>
                <Headers></Headers>
                <Outlet></Outlet>
                <Footers></Footers>
            </Layout>
        </>
    );
};
