import React, { useState } from 'react';
import { KeywordListDataType } from '../../DataType/manageType';
import { ItemKeywordList } from './manageitemkeyword/itemKeywordList';
import { ItemKeywordSearch } from './manageitemkeyword/itemKeywordSearch';

export const ManageItem = () => {
    const [keywordList, setKeywordList] = useState<KeywordListDataType[]>([]);

    return (
        <>
            <ItemKeywordSearch setKeywordList={setKeywordList} />
            <ItemKeywordList keywordList={keywordList} setKeywordList={setKeywordList} />
        </>
    );
};
