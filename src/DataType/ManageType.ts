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

//가공된 광고주 계정 설정 -> 타입을 추가해 주기
// export interface ProcAdvMngType {
//     // advId: string; //광고주 ID(FK)
//     adIngActYn: number; //광고 진행 활성 여부
//     balance: number; //잔액
//     eventMoneyBalance: number; //이벤트 머니 잔액
//     dayLimitBudget: number; //일 제한 예산
// }
