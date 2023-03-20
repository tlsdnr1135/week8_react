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
}
//그룹 리스트 테이블 columns
// export interface

//가공된 광고주 계정 설정 -> 타입을 추가해 주기
// export interface ProcAdvMngType {
//     // advId: string; //광고주 ID(FK)
//     adIngActYn: number; //광고 진행 활성 여부
//     balance: number; //잔액
//     eventMoneyBalance: number; //이벤트 머니 잔액
//     dayLimitBudget: number; //일 제한 예산
// }
