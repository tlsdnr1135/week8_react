import { Button, Input, Modal, Upload, UploadFile, UploadProps } from 'antd';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { TaskReportAPIs } from '../../../api/taskReportAPIs';
import { requestTaskListType, taskReportListType } from '../../../DataType/ConfirmType';
import { descTaskStatus } from './requestTaskInfo';

interface props {
    setRequestReportList: React.Dispatch<React.SetStateAction<requestTaskListType[]>>;
}

export const RequestTask = ({ setRequestReportList }: props) => {
    const { saveFiles, getTaskRequestLists } = TaskReportAPIs(); //API
    const [inputFileName, setInputFileName] = useState(''); //인풋 파일네임
    const [inputTaskName, setInputTaskName] = useState(''); //인풋 작업명
    const [fileList, setFileList] = useState<UploadFile[]>([]); //파일 리스트
    // const [uploading, setUploading] = useState(false); //업로드 상태
    const [file, setFile] = useState<UploadFile>(); //파일

    //csvData
    const csvData: taskReportListType[] = [];
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

    //업로드 버튼
    const handleUpload = async () => {
        console.log('파일 리스트', fileList);

        if (inputTaskName.length === 0) {
            Modal.warning({ content: '작업 명을 입력해 주세요' });
            return null;
        }

        try {
            const res1 = await saveFiles({ formData: file!, taskName: inputTaskName });
            console.log(res1);
            setInputTaskName(''); //인풋 작업명 초기화
            setInputFileName(''); //인풋 요청 파일 업로드 초기화
            // setUploading(false); //업로드 상태 false
            setFileList([]);
            Modal.info({ content: '성공!!' });
            const list = await getTaskRequestLists(); //데이터 리셋
            descTaskStatus(list.data);
            setRequestReportList(list.data);
        } catch (e) {
            console.log(e);
            Modal.error({ content: '이미 같은 작업명이 있어용!' });
        }
    };

    //upload 핸들
    const upLoadProps: UploadProps = {
        onChange: (file) => {
            console.log('파일 변경');
            console.log(file);
            setInputFileName(file.file.name);
        },
        // onRemove: (file) => {
        //     console.log('파일 지움');
        //     setFileList([]);
        // },
        beforeUpload: (file) => {
            //파일 리스트에 있는걸로 상태 확인..
            console.log('파일 업로드');
            setFile(file);
            const temp: UploadFile[] = [];
            temp.push(file);
            setFileList([...temp]);
            return false;
        },
        fileList,
    };

    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">작업 요청</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">요청 템플릿</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        {/*    버튼   */}
                                        <CSVLink
                                            type="primary"
                                            style={{ margin: '10px' }}
                                            data={csvData}
                                            headers={headers}
                                            filename={`요청용 템플릿`}
                                        >
                                            <Button type="primary" className="pink" size={'large'}>
                                                <span>템플릿 다운로드</span>
                                            </Button>
                                        </CSVLink>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span
                                        className="fz-15 fc-gray-800"
                                        style={{ marginTop: '35px' }}
                                    >
                                        요청 파일 업로드
                                    </span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="파일을 업로드해주세요"
                                            disabled={true}
                                            type="text"
                                            value={inputFileName}
                                            onChange={(e) =>
                                                setInputFileName(e.currentTarget.value)
                                            }
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                    <div className="box-left">
                                        <Upload
                                            className="pink"
                                            {...upLoadProps}
                                            showUploadList={false}
                                        >
                                            <Button
                                                type="primary"
                                                style={{ margin: '10px' }}
                                                className="pink"
                                                size={'large'}
                                            >
                                                <span>업로드</span>
                                            </Button>
                                        </Upload>
                                    </div>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">작업명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="작업명을 입력해주세요"
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            value={inputTaskName}
                                            onChange={(e) =>
                                                setInputTaskName(e.currentTarget.value)
                                            }
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-center">
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            onClick={() => {
                                setInputFileName('');
                                setInputTaskName('');
                                setFileList([]);
                            }}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            className="pink"
                            size={'large'}
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            // loading={uploading}
                        >
                            <span>요청</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
