import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { requestTaskListType } from '../../../DataType/ConfirmType';

interface props {
    requestReportList: requestTaskListType[];
}
export const RequestTaskInfo = ({ requestReportList }: props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션

    //테이블 컬럼
    const columns: ColumnsType<requestTaskListType> = [
        {
            title: '키워드 명',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.kwdName}</span>
            ),
        },
        {
            title: '검수 키워드 삭제',
            key: 'action',
            align: 'center',
            render: (value, record) => (
                <Button
                    className={'pink'}
                    size={'large'}
                    // onClick={() => deleteKeyWordButton(record)}
                >
                    삭제
                </Button>
            ),
        },
    ];
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">작업 요청 내역</h2>
                    </div>
                    <div className="box-right"></div>
                </div>

                <div className="box-body">
                    <Table
                        columns={columns}
                        dataSource={requestReportList}
                        pagination={{
                            total: requestReportList.length,
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
