//검수 키워드 리스트
export interface keywordList {
    key: number;
    index: number;
    kwdName: string;
    sellPossKwdYn: number;
    manualCnrKwdYn: number;
}
//광고 키워드 리스트
export interface confirmAdListType {
    key: number; //dad_det_id
    index: number;
    itemName: string;
    kwdName: number;
    cnrReqId: number; //검수 요청 아이디
}
//광고 현황 리스트
export interface currenStateAdListType {
    key: number; //DadDetId
    itemName: string;
    kwdName: string;
    adultYn: number;
}
//csv
export interface keywordListCsv {
    kwdName: string;
}
