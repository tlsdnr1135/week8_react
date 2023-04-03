import React from 'react';
import { CurrentStateAdGraph } from './currentstatead/currentStateAdGraph';
import { CurrentStateAdList } from './currentstatead/currentStateAdList';

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
                            <CurrentStateAdGraph />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
