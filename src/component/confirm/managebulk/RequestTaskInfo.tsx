import { Button, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { TaskReportAPIs } from '../../../api/taskReportAPIs';
import { requestTaskListType, taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    requestReportList: requestTaskListType[];
    setRequestReportList: React.Dispatch<React.SetStateAction<requestTaskListType[]>>;
}
export const RequestTaskInfo = ({ requestReportList, setRequestReportList }: props) => {
    const { getTaskRequestLists, getFileDownload } = TaskReportAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [csvData, setCsvData] = useState<taskReportListType[]>([]); //csvData
    const csvLink = useRef(); //

    //초기세팅
    useEffect(() => {
        console.log('유즈이펙트');
        getTaskRequestLists()
            .then((res) => {
                console.log(res);
                setRequestReportList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // const csvData: taskReportListType[] = [];
    //csv
    const headers = [
        { label: '날짜', key: 'date' },
        { label: '직접 광고 ID', key: 'dadDetId' },
        { label: '노출수', key: 'showCount' },
        { label: '클릭수', key: 'clickCount' },
        { label: '평균 노출순위', key: 'avgShowRank' },
        { label: '평균 클릭비용', key: 'avgCpc' },
        { label: '광고비', key: 'adCost' },
    ];

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
                <span style={{ display: 'block', textAlign: 'left' }}>{record.taskStatus}</span>
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
                    {/*<CSVLink*/}
                    {/*    type="primary"*/}
                    {/*    style={{ margin: '10px' }}*/}
                    {/*    data={csvData}*/}
                    {/*    headers={headers}*/}
                    {/*    filename={`리포트`}*/}
                    {/*    onClick={() => csvData}*/}
                    {/*>*/}
                    <Button
                        className={'pink'}
                        size={'large'}
                        // download={'/test1.txt'}
                        // href={'Data '}
                        onClick={() => downloadHandle(record)}
                    >
                        다운로드
                    </Button>
                    {/*<a href={'C:\\Users\\dev\\Desktop/test1.txt'}>sda</a>*/}
                    {/*</CSVLink>*/}
                </>
            ),
        },
    ];

    // const downloadHandle = async () => {
    //     try {
    //         const axiosResponse = await getFileDownload();
    //
    //         console.log('111111111111111111111111');
    //         console.log(axiosResponse);
    //         const aElement = document.createElement('a');
    //         const blobFile = window.URL.createObjectURL(new Blob([axiosResponse.data]));
    //         aElement.href = blobFile;
    //
    //         const contentDisposition: string = axiosResponse.headers['content-disposition'];
    //         if (contentDisposition) {
    //             // X이부분은 참고하지말자 너무 위험하다..X
    //             const filename = contentDisposition.split(';')[1].trim().split('=');
    //             // 파일명 설정
    //             aElement.download = filename[1];
    //         }
    //         document.body.appendChild(aElement);
    //         aElement.click();
    //         setTimeout(() => {
    //             // 이제 더이상 필요 없으니 생성한 a태그를 1초후 삭제 시켜준다.
    //             aElement.remove();
    //         }, 1000);
    //     } catch (e) {
    //         console.log('헤헤');
    //     }
    // };

    const downloadHandle = async (record: requestTaskListType) => {
        console.log('바뀐거', record.taskName);
        const axiosResponse = await getFileDownload({ fileName: record.taskName });
        const blobFile = window.URL.createObjectURL(new Blob([axiosResponse.data]));
        const download = document.createElement('a');

        download.href = blobFile;
        download.setAttribute('download', record.taskName + '.csv');
        download.setAttribute('type', 'text/csv');
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
                        {/*<a onClick={downloadHandle}>테스트 다운로드</a>*/}
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
