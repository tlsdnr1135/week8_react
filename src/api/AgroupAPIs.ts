import API from './ApiService';
import React from 'react';

//AgroupApi
export const AgroupAPIs = () => ({
    //광고그룹 셀렉터BOX 조회
    getAgroupSelectBoxList: () => API.get('/api/agroup/find'),

    //광고그룹 단일 조회
    getAgroupDetails: (parameter: { agroupId: number }) =>
        API.get('/api/agroup/find/details', {
            params: { agroupId: parameter.agroupId },
        }),

    //그룹 리스트 조회
    getAdGroupList: (parameter: { name: string; agroupName: string }) =>
        API.get('/api/agroup/find/manage', {
            params: { name: parameter.name, agroupName: parameter.agroupName },
        }),

    //광고그룹 추가하기
    saveAgroup: (parameter: { agroupName: string }) =>
        API.post('/api/agroup/save', {
            agroupName: parameter.agroupName,
        }),

    //OnOff(agroupUseActYn)일괄 변경
    getAgroupOnOff: (parameter: { idList: React.Key[]; yn: number }) =>
        API.put('/api/agroup/update/onoff', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),

    //광고그룹 사용 설정 여부(agroupUseActYn)변경
    updateAgroupUseActYn: (parameter: { agroupName: string }) =>
        API.put('/api/agroup/update/agroupuseactyn', {
            agroupName: parameter.agroupName,
        }),

    //광고그룹 이름 변경하기(AgroupName)
    updateAgroupName: (parameter: { beforeAgroupName: string; afterAgroupName: string }) =>
        API.put('/api/agroup/update/agroupname', {
            beforeAgroupName: parameter.beforeAgroupName,
            afterAgroupName: parameter.afterAgroupName,
        }),

    //광고그룹 삭제하기(활성여부 0,agroupActYn)
    deleteAgroupActYn: (parameter: { idList: React.Key[] }) =>
        API.put('/api/agroup/delete/agroupactyn', {
            longList: parameter.idList,
        }),
});
