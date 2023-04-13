import API from './apiService';

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
    //키워드 리스트(admin)
    getKeywordListManual: (parameter: { keywordName: string }) =>
        API.get('/api/keyword/find/manual', {
            params: {
                keywordName: parameter.keywordName,
            },
        }),
    //키워드 업데이트(admin, Manual)
    updateKeywordManual: (parameter: { keywordName: string }) =>
        API.put('/api/keyword/update/manual', {
            keywordName: parameter.keywordName,
        }),
    //키워드 업데이트(admin, Manual)
    updateKeywordManualOff: (parameter: { id: number }) =>
        API.put('/api/keyword/manual/off', {
            id: parameter.id,
        }),

    //OnOff버튼(AdUseConfigYn, DadUseConfigYn)
    updateDadUseConfigYnOnOffAll: (parameter: { idList: number[]; yn: number }) =>
        API.put('/api/daddet/update/dadusecofingyn', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),

    //Delete버튼(DaddetActYn)
    updateDaddetActYnDeleteButton: (parameter: { idList: number[] }) =>
        API.put('/api/daddet/update/daddetactyn', {
            longList: parameter.idList,
        }),
    //On/Off a링크
    // updateDadUseConfigYnOnOff: (parameter: { daddetId: number; yn: number }) =>
    //     API.put('/api/daddet/update/daduseconfigynone', {
    //         daddetId: parameter.daddetId,
    //         yn: parameter.yn,
    //     }),
});
