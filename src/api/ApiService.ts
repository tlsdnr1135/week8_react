import axios from 'axios';
import React, { useState } from 'react';
import { KeyWordType } from '../DataType/RedAdType';

//헤더
export const API = axios.create({
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

    // //광고그룹 추가하기
    // saveAgroup: (parameter: { agroupName: string }) =>
    //     API.post('/api/agroup/save', {
    //         agroupName: parameter.agroupName,
    //     }),
    // //광고그룹 삭제하기(활성여부 0,agroupActYn)
    // deleteAgroupActYn: (parameter: { idList: React.Key[] }) =>
    //     API.put('/api/agroup/delete/agroupactyn', {
    //         longList: parameter.idList,
    //     }),
    // //광고그룹 사용 설정 여부(agroupUseActYn)변경
    // updateAgroupActYn: (parameter: { name: string }) =>
    //     API.put('/api/agroup/update/agroupuseactyn', {
    //         agroupName: parameter.name,
    //     }),
});

//헤더가 필요 없는 요청

export default API;
