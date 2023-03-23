import React, { useState } from 'react';
import { ItemKeywordSearch } from './manageitemkeyword/ItemKeywordSearch';
import { ItemKeywordList } from './manageitemkeyword/ItemKeywordList';
import { KeywordListDataType } from '../../DataType/ManageType';

export const ManageItem = () => {
    const [keywordList, setKeywordList] = useState<KeywordListDataType[]>([]);

    return (
        <>
            <ItemKeywordSearch setKeywordList={setKeywordList} />
            <ItemKeywordList keywordList={keywordList} setKeywordList={setKeywordList} />
        </>
    );
};
