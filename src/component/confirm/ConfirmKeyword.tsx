import React from 'react';
import { Confirmkeywordsearch } from './confirmkeyword/Confirmkeywordsearch';
import { ConfirmkeywordList } from './confirmkeyword/ConfirmkeywordList';

export const ConfirmKeyword = () => {
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">키워드 검수</h1>
                        </div>
                        <div className="content-body">
                            <Confirmkeywordsearch />
                            <ConfirmkeywordList />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
