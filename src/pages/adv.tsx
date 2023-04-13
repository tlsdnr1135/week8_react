import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footers } from '../component/common/footers';
import { Headers } from '../component/common/headers';
import useLoginStore from '../store/useLoginStore';

export const Adv = () => {
    const { role } = useLoginStore();
    return (
        <>
            <section className="ant-layout layout css-dev-only-do-not-override-1me4733">
                <Headers></Headers>
                {/*{}*/}
                <Outlet></Outlet>
                <Footers></Footers>
            </section>
        </>
    );
};

export default Adv;
