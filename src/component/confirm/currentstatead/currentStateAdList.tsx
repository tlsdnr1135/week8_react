import { PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { AdAPIs } from '../../../api/adAPIs';
import { DadReportAPIs } from '../../../api/dadReportAPIs';
import { currenStateAdListType, taskReportListType } from '../../../DataType/confirmType';

interface props {
    setDadReportList: React.Dispatch<React.SetStateAction<taskReportListType[]>>;
    seItemName: React.Dispatch<React.SetStateAction<string>>;
}

//소수점 계산과 광고비 -> csv에도 보여야함.
const makeFixed = (data: taskReportListType[]) => {
    data.forEach((item) => {
        item.DescFixedAvgShowRank = item.avgShowRank.toFixed(1);
        item.DescFixedAvgCpc = item.avgCpc.toFixed(1);
        item.DescFixedAdCost = item.adCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    return data;
};

//합계 계산
const makeFooter = (data: taskReportListType[]) => {
    let showCount = 0; //노출 수
    let clickCount = 0; //클릭 카운트
    let adCost = 0; //광고비
    let avgShowRank = 0; //반올림 1자리
    let avgCpc = 0; //소수점 x
    //
    // let clickRate = ''; //클릭 율
    // let DescAvgShowRank = ''; //계산 - 평균 노출 수
    // let DescAvgCpc = ''; //계산 - 평균 클릭 수
    // let DescAdCost = ''; //계산 - 평균 광고 비용

    data.forEach((item: taskReportListType) => {
        showCount += item.showCount;
        clickCount += item.clickCount;
        adCost += item.adCost;
        avgShowRank += item.avgShowRank;
        avgCpc += item.avgCpc;
    });

    const clickRate = ((clickCount / showCount) * 100).toFixed(1); //클릭 율 -> 합계
    const DescAvgShowRank = (avgShowRank / data.length).toFixed(1); //평균 노출 순위
    const DescAvgCpc = (avgCpc / data.length).toFixed(0);
    const DescAdCost = adCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //광고 비용

    const items: taskReportListType = {
        dadDetId: '합계',
        date: '-',
        showCount: showCount, //노출 수
        clickCount: clickCount, //클릭 수
        avgShowRank: parseInt(DescAvgShowRank), //평균 노출 순위
        avgCpc: avgCpc, //평균 클릭 비용
        adCost: adCost, //광고비
        //----------------------
        DescFixedAvgShowRank: '',
        DescFixedAvgCpc: '',
        DescFixedAdCost: '',
        // --------------------------------------------------------------
        clickRate: parseInt(clickRate), //클릭율
        DescAvgShowRank: DescAvgShowRank,
        DescAvgCpc: DescAvgCpc,
        DescAdCost: DescAdCost, //광고비 ,
        key: 0, //키
    };

    return items;
};
export const CurrentStateAdList = ({ setDadReportList, seItemName }: props) => {
    const { getListsByDadDetId } = DadReportAPIs(); //API
    const { findCurrentStateAdLists } = AdAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [currentStateAdList, setCurrentStateAdList] = useState<currenStateAdListType[]>([]);

    //초기 세팅( 작업 요청 폼 )
    useEffect(() => {
        findCurrentStateAdLists()
            .then((res) => {
                console.log(res.data);
                setCurrentStateAdList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //테이블 컬럼
    const columns: ColumnsType<currenStateAdListType> = [
        {
            title: '직접광고 상세 ID',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.key}</span>
            ),
        },
        {
            title: '상품 명',
            align: 'center',
            render: (record) => (
                <a
                    style={{ display: 'block', textAlign: 'left', color: 'dodgerblue' }}
                    onClick={async () => {
                        try {
                            const res = await getListsByDadDetId({ id: record.key });
                            //처음 오브젝트에 소수점 계산
                            const data = makeFixed(res.data);
                            //그 다음
                            res.data.push(makeFooter(data));
                            seItemName(record.itemName); //넘겨줄 아이템 이름.
                            setDadReportList(res.data); //작업 요청 내역 리스트
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    {record.itemName}
                </a>
            ),
        },
        {
            title: '키워드 명',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.kwdName}</span>
            ),
        },
        {
            title: '성인 여부',
            align: 'center',
            render: (value, record, index) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {record.adultYn === 1 ? '성인 상품' : '일반 상품'}
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 현황</h2>
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        columns={columns}
                        dataSource={currentStateAdList}
                        pagination={{
                            total: currentStateAdList.length,
                            showTotal: showTotal,
                            size: 'default',
                        }}
                        bordered
                    />
                </div>
            </section>
        </>
    );
};
