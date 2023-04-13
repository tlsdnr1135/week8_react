import React, { useState } from 'react';
import { keywordList } from '../../DataType/confirmType';
import { ConfirmKeywordList } from './confirmkeyword/confirmKeywordList';
import { ConfirmKeywordSearch } from './confirmkeyword/confirmKeywordSearch';

export const ConfirmKeyword = () => {
    const [keywordList, setKeywordList] = useState<keywordList[]>([]); //키워드 리스트
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">키워드 검수</h1>
                        </div>
                        <div className="content-body">
                            <ConfirmKeywordSearch setKeywordList={setKeywordList} />
                            <ConfirmKeywordList
                                keywordList={keywordList}
                                setKeywordList={setKeywordList}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
