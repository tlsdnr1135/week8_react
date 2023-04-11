import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { CSVLink } from 'react-csv';
import { taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    dadReportList: taskReportListType[];
}
export const CurrentStateAdReportList = ({ dadReportList }: props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션

    //csv
    const headers = [
        { label: '직접광고 상세 ID', key: 'dadDetId' },
        { label: '날짜', key: 'date' },
        { label: '노출 수', key: 'showCount' },
        { label: '클릭 수', key: 'clickCount' },
        { label: '클릭율', key: 'clickRate' },
        { label: '평균 노출 순위', key: 'avgShowRank' },
        { label: '평균 클릭 비용', key: 'avgCpc' },
        { label: '광고 비용', key: 'adCost' },
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
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {((record.clickCount / record.showCount) * 100).toFixed(1)}%
                </span>
            ),
        },
        {
            title: '평균 노출 순위',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.avgShowRank}</span>
            ),
        },
        {
            title: '평균 클릭 비용',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.avgCpc}</span>
            ),
        },
        {
            title: '광고비',
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
                        <CSVLink
                            type="primary"
                            data={dadReportList}
                            headers={headers}
                            filename={`검수 키워드 리스트`}
                        >
                            <Button
                                type="primary"
                                className="white"
                                size={'large'}
                                value={'CANCEL'}
                            >
                                <span>키워드 다운로드</span>
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
                        summary={(items) => {
                            let showCount = 0;
                            let clickCount = 0;
                            let clickRate = '';
                            let avgShowRank = 0; //반올림 2자리
                            let DescAvgShowRank = '';
                            let avgCpc = 0; //소수점 x
                            let adCost = 0;
                            let DescAdCost = '';
                            items.forEach((item) => {
                                showCount += item.showCount;
                                clickCount += item.clickCount;
                                avgShowRank += item.avgShowRank;
                                avgCpc += item.avgCpc;
                                adCost += parseInt(item.adCost);
                            });
                            DescAdCost = adCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //광고 비용
                            DescAvgShowRank = (avgShowRank / items.length).toFixed(1); //평균 노출 순위
                            avgCpc = Math.round(avgCpc / items.length); //평균 클릭 비용
                            clickRate = ((clickCount / showCount) * 100).toFixed(1); //클릭 율

                            return (
                                <>
                                    <Table.Summary fixed>
                                        <Table.Summary.Row>
                                            <Table.Summary.Cell index={0}>합계</Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}>-</Table.Summary.Cell>
                                            <Table.Summary.Cell index={2}>
                                                {showCount}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={3}>
                                                {clickCount}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={4}>
                                                {clickRate}%
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={5}>
                                                {DescAvgShowRank}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={6}>
                                                {avgCpc}
                                            </Table.Summary.Cell>
                                            <Table.Summary.Cell index={7}>
                                                {DescAdCost}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </Table.Summary>
                                </>
                            );
                        }}
                        bordered
                    />
                </div>
            </section>
        </>
    );
};
