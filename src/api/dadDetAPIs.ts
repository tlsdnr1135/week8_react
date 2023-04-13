import API from './apiService';

//DadDetApi
export const DadDetAPIs = () => ({
    //상품 조회
    getDadDetListsJoinAdkwdItem: (parameter: { kwdName: string }) =>
        API.get('/api/daddet/lists', {
            params: {
                kwdName: parameter.kwdName,
            },
        }),

    //검수 처리(반려)
    updateConfirmReject: (parameter: {
        dadDetId: number | undefined;
        cnrReqId: number | undefined;
    }) =>
        API.put('/api/daddet/confirm/reject', {
            dadDetId: parameter.dadDetId,
            cnrReqId: parameter.cnrReqId,
        }),
    //검수 처리(승인)
    updateConfirmApproval: (parameter: {
        dadDetId: number | undefined;
        cnrReqId: number | undefined;
    }) =>
        API.put('/api/daddet/confirm/approval', {
            dadDetId: parameter.dadDetId,
            cnrReqId: parameter.cnrReqId,
        }),
});
