import axios from 'axios';
import { KeyWordType } from '../DataType/redAdType';

//헤더
export const API = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://13.125.210.93:8080',
    headers: {
        ImSulbinHeader: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'application/json',
    },
});
export const APIFILE = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://13.125.210.93:8080',
    headers: {
        ImSulbinHeader: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'multipart/form-data; charset=utf-8',
        // charset: 'utf-8',
        // 'Content-Encoding': 'utf-8',
    },
});

//헤더가 필요한 요청
export const APIs = () => ({
    //광고 등록하기
    setAd: (parameter: {
        adv: { name: string };
        agroup: { agroupName: string };
        item: { id: number };
        kwd: KeyWordType[];
    }) =>
        API.post('/api/ad/save', {
            adv: {
                name: parameter.adv.name as string,
            },
            agroup: {
                agroupName: parameter.agroup.agroupName as string,
            },
            item: {
                id: parameter.item.id as number,
            },
            kwd: parameter.kwd,
        }),

    //광고주 불러오기
    getAdv: (parameter: { name: string }) =>
        API.get('/api/adv/find', {
            params: {
                name: parameter.name,
            },
        }),
    //광고주 활성여부 변화
    updateAdvAdIngActYn: (parameter: { name: string; adIngActYn: number }) =>
        API.put('/api/adv/update', {
            name: parameter.name,
            adIngActYn: parameter.adIngActYn,
        }),
    //광고주 일 제한 예산
    updateAdvDayLimitBudget: (parameter: { name: string; dayLimitBudget: number }) =>
        API.put('/api/adv/update/daylb', {
            name: parameter.name,
            dayLimitBudget: parameter.dayLimitBudget,
        }),
});

//헤더가 필요 없는 요청

export default API;
