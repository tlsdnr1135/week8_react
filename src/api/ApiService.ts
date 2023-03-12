import axios from 'axios';
import { useState } from 'react';

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

    //키워드 리스트 조회
    // getKeyWordList: () => API.get('/api/keyword/find'),

    //광고 등록하기
    setAd: (data: { id: string }) => API.post('/api/ad/save', { id: data.id }),
});

//헤더가 필요 없는 요청

export default API;
