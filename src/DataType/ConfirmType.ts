//검수 키워드 리스트
export interface keywordList {
    key: number;
    index: number;
    kwdName: string;
    sellPossKwdYn: number;
    manualCnrKwdYn: number;
}
//광고 키워드 리스트
export interface ConfirmAdListType {
    key: number;
    index: number;
    kwdName: string;
    sellPossKwdYn: number;
    manualCnrKwdYn: number;
}
//csv
export interface keywordListCsv {
    kwdName: string;
}
