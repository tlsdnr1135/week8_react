import { Button, Input, message, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { TaskReportAPIs } from '../../../api/taskReportAPIs';
import { requestTaskListType, taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    setRequestReportList: React.Dispatch<React.SetStateAction<requestTaskListType[]>>;
}
export const RequestTask = ({ setRequestReportList }: props) => {
    const { saveFiles } = TaskReportAPIs(); //API
    const [input, setInput] = useState(''); //인풋
    const [fileList, setFileList] = useState<UploadFile[]>([]); //파일 리스트
    const [uploading, setUploading] = useState(false); //업로드 상태

    //업로드 버튼
    const handleUpload = () => {
        console.log('파일 리스트', fileList);
        const formData = new FormData();
        fileList.forEach((file) => {
            console.log('파일 넣기', file);
            formData.append('files[]', file as RcFile);
            console.log('폼 데이터 forEach 안', formData);
        });
        setUploading(true);
        console.log('폼 데이터', formData);

        saveFiles({ formData: fileList })
            .then((res) => res.data())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });

        // You can use any AJAX library you like
        // fetch('http://localhost:8080/api/v1/files', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((res) => res.json())
        //     .then(() => {
        //         setFileList([]);
        //         message.success('upload successfully.');
        //     })
        //     .catch(() => {
        //         message.error('upload failed.');
        //     })
        //     .finally(() => {
        //         setUploading(false);
        //     });
    };
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

    //upload
    const upLoadProps: UploadProps = {
        onChange: (info) => {
            console.log(info);
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            console.log(file);
            console.log(file.uid);
            setFileList([...fileList, file]);

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
                                            <Button
                                                type="primary"
                                                className="pink"
                                                size={'large'}
                                                // onClick={keywordSearchButton}
                                            >
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
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.currentTarget.value)}
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                    <div className="box-left">
                                        <Upload className="pink" {...upLoadProps}>
                                            <Button
                                                type="primary"
                                                style={{ margin: '10px' }}
                                                className="pink"
                                                size={'large'}
                                                // onClick={keywordSearchButton}
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
                                            // value={input}
                                            // onChange={(e) => setInput(e.currentTarget.value)}
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
                            // onClick={keywordSearchButton}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
