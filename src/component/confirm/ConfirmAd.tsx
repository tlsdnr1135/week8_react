import React, { useState } from 'react';
import { ConfirmAdSearch } from './confirmad/ConfirmAdSearch';
import { confirmAdListType } from '../../DataType/ConfirmType';
import { ConfirmAdList } from './confirmad/ConfirmAdList';

export const ConfirmAd = () => {
    const [confirmAdList, setConfirmAdList] = useState<confirmAdListType[]>([]); //키워드 리스트
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 검수</h1>
                        </div>
                        <div className="content-body">
                            <ConfirmAdSearch setConfirmAdList={setConfirmAdList} />
                            <ConfirmAdList
                                confirmAdList={confirmAdList}
                                setConfirmAdList={setConfirmAdList}
                            ></ConfirmAdList>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
