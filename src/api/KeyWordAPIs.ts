import API from './ApiService';
import React from 'react';
import { ItemListDataType } from '../DataType/ManageType';

//Keyword
export const KeyWordAPIs = () => ({
    //키워드 리스트
    getkeywordListJoinDadDetFind: (parameter: { adId: number; kwdName: string }) =>
        API.get('/api/keyword/find/joindaddet', {
            params: {
                adId: parameter.adId,
                kwdName: parameter.kwdName,
            },
        }),
    //OnOff버튼(AdUseConfigYn, DadUseConfigYn)
    updateDadUseConfigYnOnOffAll: (parameter: { idList: number[]; yn: number }) =>
        API.put('/api/daddet/update/dadusecofingyn', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),
});