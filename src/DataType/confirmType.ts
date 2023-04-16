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

//작업 요청 내용 리스트
export interface requestTaskListType {
    key: number;
    taskName: string; //태스크 명 - 작업 명
    taskStatus: string; //태스크 상태 - REQ
    descTaskStatus: string; //태스크 상태 한글

    advId: string; //회원 ID - 작업 요청한 회원 ID
    taskPath: string; //태스크 요청 파일 경로 - 업로드한 파일 경로
    taskRequestTime: string; //태스크 요청 시간 - 작업 요청한 날짜 및 시간
}

//작업 레포트 리스트
export interface taskReportListType {
    key: number;
    date: string; //날짜
    dadDetId: number | string; //직접 광고 상세 ID
    showCount: number; //노출 수
    clickCount: number; //클릭 수
    avgShowRank: number; //평균 노출 순위
    avgCpc: number; //평균 클릭 비용
    adCost: number; //광고 비용
    // ---------------------------------
    DescFixedAvgShowRank: string;
    DescFixedAvgCpc: string;
    DescFixedAdCost: string;
    // ----------------------------------
    clickRate: number; //클릭율
}

//csv
export interface keywordListCsv {
    kwdName: string;
}

//csv
export interface taskReportListCsv {
    key: number;
    date: string; //날짜
    dadDetId: number; //직접 광고 상세 ID
    showCount: number; //노출 수
    clickCount: number; //클릭 수
    clickRate: number; //클릭율
    avgShowRank: number; //평균 노출 순위
    avgCpc: number; //평균 클릭 비용
    adCost: string; //광고 비용
}
