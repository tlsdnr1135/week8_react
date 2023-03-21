import React, { useEffect, useState } from 'react';
import { AdvInformation } from './managead/AdvInformation';
import { AgroupSearch } from './managead/AgroupSearch';
import { AgroupList } from './managead/agroupList';
import { AgroupInformation } from './manageagroup/AgroupInformation';
import { ItemSearh } from './manageagroup/ItemSearh';
import { ItemList } from './manageagroup/ItemList';
import { useLocation } from 'react-router-dom';

export const ManageAgroup = () => {
    const location = useLocation();
    // console.log(location.state.agroupName);
    // console.log(location.state.agroupName);
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">그룹 관리</h1>
                        </div>
                        <div className="content-body">
                            <AgroupInformation />
                            <ItemSearh />
                            <ItemList />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
