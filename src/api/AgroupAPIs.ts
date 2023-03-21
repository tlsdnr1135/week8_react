import API from './ApiService';

//AgroupApi
export const AgroupAPI = () => ({
    //광고그룹 셀렉터BOX 조회
    getAgroupSelectBoxList: () => API.get('/api/agroup/find'),

    //그룹 리스트 조회
    getAdGroupList: (parameter: { name: string; agroupName: string }) =>
        API.get('/api/agroup/find/manage', {
            params: { name: parameter.name, agroupName: parameter.agroupName },
        }),
});
