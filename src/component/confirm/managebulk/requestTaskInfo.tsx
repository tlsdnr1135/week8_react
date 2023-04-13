import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect } from 'react';
import { TaskReportAPIs } from '../../../api/taskReportAPIs';
import { requestTaskListType } from '../../../DataType/confirmType';

interface props {
    requestReportList: requestTaskListType[];
    setRequestReportList: React.Dispatch<React.SetStateAction<requestTaskListType[]>>;
}

export const descTaskStatus = (data: requestTaskListType[]) => {
    data.forEach((item) => {
        switch (item.taskStatus) {
            case 'REQ':
                return (item.descTaskStatus = '요청');
            case 'COMPLETE':
                return (item.descTaskStatus = '완료');
            case 'ERROR':
                return (item.descTaskStatus = '에러');
            case 'ING':
                return (item.descTaskStatus = '진행');
        }
    });
};

export const RequestTaskInfo = ({ requestReportList, setRequestReportList }: props) => {
    const { getTaskRequestLists, getFileDownload } = TaskReportAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션

    //초기세팅
    useEffect(() => {
        getTaskRequestLists()
            .then((res) => {
                console.log(res);
                descTaskStatus(res.data);
                setRequestReportList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //테이블 컬럼
    const columns: ColumnsType<requestTaskListType> = [
        {
            title: '작업명 명',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.taskName}</span>
            ),
        },
        {
            title: '작업 상태',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.descTaskStatus}</span>
            ),
        },
        {
            title: '등록자',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.advId}</span>
            ),
        },
        {
            title: '등록 시간',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {moment(record.taskRequestTime).format('YYYY.MM.DD HH:mm')}
                </span>
            ),
        },

        {
            title: '요청 파일',
            key: 'action',
            align: 'center',
            render: (value, record) => (
                <>
                    <Button
                        className={'pink'}
                        size={'large'}
                        onClick={() => downloadHandle(record)}
                    >
                        다운로드
                    </Button>
                </>
            ),
        },
    ];

    const downloadHandle = async (record: requestTaskListType) => {
        console.log('바뀐거', record.taskName);
        const axiosResponse = await getFileDownload({ fileName: record.taskName });
        console.log('리턴: ', '\ufeff' + axiosResponse.data);
        const blobFile = window.URL.createObjectURL(
            new Blob(['\ufeff' + axiosResponse.data], { type: 'text/csv;charset=utf-8;' })
        );
        const download = document.createElement('a');

        download.href = blobFile;
        download.setAttribute('download', record.taskName + '.csv');
        download.setAttribute('Content-type', 'text/csv; charset=x-windows-949');
        download.click();
        setTimeout(() => {
            // 이제 더이상 필요 없으니 생성한 a태그를 1초후 삭제 시켜준다.
            download.remove();
        }, 1000);
    };

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
