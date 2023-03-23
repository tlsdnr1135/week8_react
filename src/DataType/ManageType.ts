//광고주 계정 설정 및 정보
export interface AdvMngType {
    advId: string; //광고주 ID(FK)
    adIngActYn: number; //광고 진행 활성 여부
    balance: number; //잔액
    eventMoneyBalance: number; //이벤트 머니 잔액
    dayLimitBudget: number; //일 제한 예산
    //*********************************************
    balanceDesc: string; //잔액
    eventMoneyBalanceDesc: string; //이벤트 머니 잔액
    statusBalance: string; //잔액 상태
    statusDayLimitBudget: string | number; //일일 허용 예산
}
//그룹 리스트
export interface AdGroupList {
    key: number; //ID값
    agroupName: string; //그룹이름
    adActYn: number; //활성상태(전체)
    adUseConfigYn: number; //사용 설정 상태(라이브)
    agroupUseActYn: number; //광고그룹 사용 설정 여부 -> 조건 하나 더 걸어야함.
    regTime: string; //등록 시간
    // **************************************************************
    // adActYnDesc: string; //활성상태(On/Off)
    // itemCount:
}
//CSV
export interface AgroupListCsv {
    key: number; //번호
    agroupName: string; //그룹이름
    agroupUseActYn: string | number; //그룹 ON/OFF(On,Off)
    itemCount: number | string; //상품 수.
}
//CSV
export interface ItemListCsv {
    key: number; //번호
    itemNo: string; //그룹이름
    itemName: string | number; //그룹 ON/OFF(On,Off)
    adUseConfigYn: number | string; //상품 수.
}

//ItemList
export interface ItemListDataType {
    key: number; //번호
    adultYn: number; //성인 여부
    itemActYn: number; //상품 활성 여부
    itemName: string; //아이템 이름
    itemNo: string; //아이템 번호
    itemOrgCost: number; //상품 원본 금액
    adUseConfigYn: number; //광고 사용 활성 여부
    adActYn: number; //광고 활성 여부
    adId: number; //광고 아이디
}
//keywordList
export interface KeywordListDataType {
    key: number;
    kwdName: string;
    manualCnrKwdYn: number;
    sellPossKwdYn: number;
    adId: number;
    dadDetId: number;
    dadActYn: number;
    dadUseConfigYn: number;
}
