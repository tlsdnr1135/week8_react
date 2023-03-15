//광고주 계정 설정 및 정보
export interface AdvMngType {
    advId: string; //광고주 ID(FK)
    advIngYn: number; //광고 진행 활성 여부
    balance: number; //잔액
    eventMoney: number; //이벤트 머니 잔액
    dayLimitBudget: number; //일 제한 예산
}
