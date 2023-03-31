import React from 'react';
import { ConfirmAdSearch } from './confirmad/ConfirmAdSearch';
import { ConfirmAdList } from './confirmad/ConfirmAdList';
import { CurrentStateAdList } from './currentstatead/CurrentStateAdList';

export const CurrentStateAd = () => {
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        {/*<div className="content-header">*/}
                        {/*    <h1 className="fz-32 fc-gray-900">광고 검수</h1>*/}
                        {/*</div>*/}
                        <div className="content-body">
                            <CurrentStateAdList />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
