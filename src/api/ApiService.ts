import axios from 'axios';
import React, { useState } from 'react';
import { KeyWordType } from '../DataType/RedAdType';

//헤더
const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        ImSulbinHeader: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'application/json',
    },
});

//헤더가 필요한 요청
export const APIs = () => ({
    //상품 조회
    getItemList: (parameter: { itemNo: string; itemName: string }) =>
        API.get('/api/item/find', {
            params: {
                itemnumber: parameter.itemNo,
                itemname: parameter.itemName,
            },
        }),

    //광고그룹 셀렉터 조회
    getAgroupSelectBoxList: () => API.get('/api/agroup/find'),

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
    //그룹 리스트 조회
    getAdGroupList: (parameter: { name: string; agroupName: string }) =>
        API.get('/api/ad/find/manage', {
            params: { name: parameter.name, agroupName: parameter.agroupName },
        }),
    //OnOff일괄 설정
    getAgroupOnOff: (parameter: { idList: React.Key[]; yn: number }) =>
        API.put('/api/agroup/find/onoff', {
            longList: parameter.idList,
            yn: parameter.yn,
        }),
    //광고그룹 추가하기
    saveAgroup: (parameter: { agroupName: string }) =>
        API.post('/api/agroup/save', {
            agroupName: parameter.agroupName,
        }),
});

//헤더가 필요 없는 요청

export default API;
