//상품조회 시
export interface DataType {
    id: number;
    key: number;
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number | string; //성인 여부 default:true(1)
    itemOrgCost: number; //상품 원본 금액
    itemActYn: number | string; //상품 활성 여부
}

//광고그룹 셀렉터
export interface AgroupSelecterType {
    key: number; //agroupId
    value: string; //그룹 명
    label: string;
    regTime: string;
    agroupActYn: number;
    agroupUseActYn: number;
}
//선택 버튼 시 선택되는 아이템 하나
export interface PickButtonType {
    id: number; // 상품 아이디
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number; //성인 여부 default:true(1)
}
//키워드 테이블
export interface KeyWordType {
    kwdName: string;
    bidCost: number;
}
