import API from './ApiService';
import React from 'react';
import { ItemListDataType } from '../DataType/ManageType';

//Ad
export const AdAPIs = () => ({
    //OnOff스위치(AdUseConfigYn, DadUseConfigYn)
    updateAdOnOff: (parameter: { idList: number[]; yn: number }) =>
        API.put('/api/ad/update/aduseconfigyn', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),
    //OnOff스위치(AdActYn, DadActYn)
    updateAdDeleteButton: (parameter: { idList: number[]; yn: number }) =>
        API.put('/api/ad/delete/adactyn', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),
});
