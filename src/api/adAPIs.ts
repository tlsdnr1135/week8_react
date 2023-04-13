import API from './apiService';

//Ad
export const AdAPIs = () => ({
    //광고 현황 리스트
    findCurrentStateAdLists: () => API.get('/api/ad/lists/currentstate'),

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
