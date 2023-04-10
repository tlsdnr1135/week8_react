import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    dadReportList: taskReportListType[];
}
export const CurrentStateAdReportList = ({ dadReportList }: props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [adCost, setAcCost] = useState(0);
    // useEffect(() => {}, []);

    // 테이블 컬럼
    const columns: ColumnsType<taskReportListType> = [
        {
            title: '직접광고 상세 ID',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.dadDetId}</span>
            ),
        },
        {
            title: '날짜',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.date}</span>
            ),
        },
        {
            title: '노촐 수',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.showCount}</span>
            ),
        },
        {
            title: '클릭 수',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.clickCount}</span>
            ),
        },
        {
            title: '클릭 율',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {((record.clickCount / record.showCount) * 100).toFixed(1)}%
                </span>
            ),
        },
        {
            title: '평균 노출 순위',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.avgShowRank}</span>
            ),
        },
        {
            title: '평균 클릭 비용',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.avgCpc}</span>
            ),
        },
        {
            title: '광고비',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.DescAdCost}</span>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left"></div>
                    <div className="box-right">
                        <Button />
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        columns={columns}
                        dataSource={dadReportList}
                        pagination={{
                            total: dadReportList?.length,
                            showTotal: showTotal,
                            size: 'default',
                        }}
                        // footer={(record: any) => {
                        //     console.log(record.);
                        // }}
                        bordered
                    />
                </div>
            </section>
        </>
    );
};
