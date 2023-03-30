import API from './ApiService';

//DadDetApi
export const DadDetAPIs = () => ({
    //상품 조회
    getDaddetListsJoinAdkwdItem: (parameter: { kwdName: string }) =>
        API.get('/api/daddet/lists', {
            params: {
                kwdName: parameter.kwdName,
            },
        }),
});
