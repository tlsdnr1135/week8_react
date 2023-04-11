import { PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { AdAPIs } from '../../../api/AdAPIs';
import { DadReportAPIs } from '../../../api/DadReportAPIs';
import { currenStateAdListType, taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    setLevel: React.Dispatch<React.SetStateAction<number>>;
    setDadReportList: React.Dispatch<React.SetStateAction<taskReportListType[]>>;
    seItemName: React.Dispatch<React.SetStateAction<string>>;
}
export const CurrentStateAdList = ({ setLevel, setDadReportList, seItemName }: props) => {
    const { getListsByDadDetId } = DadReportAPIs();
    const { findCurrentStateAdLists } = AdAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [currentStateAdList, setCurrentStateAdList] = useState<currenStateAdListType[]>([]);

    //초기 세팅
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
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.key}</span>
            ),
        },
        {
            title: '상품 명',
            key: 'kwdName',
            align: 'center',
            render: (record) => (
                <a
                    style={{ display: 'block', textAlign: 'left', color: 'dodgerblue' }}
                    onClick={async () => {
                        setLevel(1);

                        try {
                            const res = await getListsByDadDetId({ id: record.key });
                            res.data.forEach((item: taskReportListType) => {
                                console.log(item.adCost);
                                item.DescAdCost = item.adCost
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            });
                            seItemName(record.itemName);
                            setDadReportList(res.data);
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
            key: 'kwdName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.kwdName}</span>
            ),
        },
        {
            title: '성인 여부',
            key: 'action',
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
