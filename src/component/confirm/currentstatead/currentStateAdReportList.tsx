import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { CSVLink } from 'react-csv';
import { taskReportListType } from '../../../DataType/confirmType';

interface props {
    dadReportList: taskReportListType[];
}

export const CurrentStateAdReportList = ({ dadReportList }: props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total - 1} items`; //페이지 네이션

    //csv
    const headers = [
        { label: '직접광고 상세 ID', key: 'dadDetId' },
        { label: '날짜', key: 'date' },
        { label: '노출 수', key: 'showCount' },
        { label: '클릭 수', key: 'clickCount' },
        { label: '클릭율', key: 'clickRate' },
        { label: '평균 노출 순위', key: 'DescFixedAvgShowRank' },
        { label: '평균 클릭 비용', key: 'DescFixedAvgCpc' },
        { label: '광고 비용', key: 'DescFixedAdCost' },
    ];

    // 테이블 컬럼
    const columns: ColumnsType<taskReportListType> = [
        {
            title: '직접광고 상세 ID',
            align: 'center',

            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.dadDetId}</span>
            ),
        },
        {
            title: '날짜',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.date}</span>
            ),
        },
        {
            title: '노촐 수',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.showCount}</span>
            ),
        },
        {
            title: '클릭 수',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.clickCount}</span>
            ),
        },
        {
            title: '클릭 율',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.clickRate}%</span>
            ),
        },
        {
            title: '평균 노출 순위',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {record.DescFixedAvgShowRank}
                </span>
            ),
        },
        {
            title: '평균 클릭 비용',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {record.DescFixedAvgCpc}
                </span>
            ),
        },
        {
            title: '광고비',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {record.DescFixedAdCost}
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left"></div>
                    <div className="box-right">
                        <CSVLink
                            type="primary"
                            data={dadReportList}
                            headers={headers}
                            filename={`광고 현황`}
                        >
                            <Button
                                type="primary"
                                className="white"
                                size={'large'}
                                value={'CANCEL'}
                            >
                                <span>다운로드</span>
                            </Button>
                        </CSVLink>
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
                        bordered
                    />
                </div>
            </section>
        </>
    );
};
