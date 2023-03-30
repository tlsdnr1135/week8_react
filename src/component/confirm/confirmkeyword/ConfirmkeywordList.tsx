import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Button, Input, Modal, PaginationProps, Table } from 'antd';
import { keywordList, keywordListCsv } from '../../../DataType/ConfirmType';
import { ColumnsType } from 'antd/es/table';
import { KeyWordAPIs } from '../../../api/KeyWordAPIs';
import { AgroupListCsv } from '../../../DataType/ManageType';
import { CSVLink } from 'react-csv';
import { setIndex } from './ConfirmKeywordSearch';

interface props {
    keywordList: keywordList[];
    setKeywordList: React.Dispatch<React.SetStateAction<keywordList[]>>;
}

export const ConfirmkeywordList = ({ keywordList, setKeywordList }: props) => {
    const { getKeywordListManual, updateKeywordManual, updateKeywordManualOff } = KeyWordAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [isModalOpen, setIsModalOpen] = useState(false); //모달
    const [input, setInput] = useState(''); //인풋

    //초기값 세팅
    useEffect(() => {
        getKeywordListManual({ keywordName: '' })
            .then((res) => {
                console.log(res);
                const data = setIndex(res.data);
                setKeywordList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //모달 핸들
    const modalHandle = async (state: boolean) => {
        //등록
        if (state) {
            try {
                console.log(input);
                await updateKeywordManual({ keywordName: input });
                const res = await getKeywordListManual({ keywordName: '' });
                const data = setIndex(res.data);
                setKeywordList(data);
                setInput('');
                setIsModalOpen(false);
                Modal.info({ content: '성공적으로 등록했습니다.' });
            } catch (e) {
                Modal.error({ content: '변경 실패. 디비에 이미 값이 있습니다.' });
                console.log(e);
                return null;
            }
            console.log();
        } else {
            //취소
            setInput('');
            setIsModalOpen(false);
        }
    };

    //삭제 버튼
    const deleteKeyWordButton = async (record: keywordList) => {
        try {
            console.log(record.key);
            await updateKeywordManualOff({ id: record.key });
            const res = await getKeywordListManual({ keywordName: '' });
            const data = setIndex(res.data);
            setKeywordList(data);
            setInput('');
            setIsModalOpen(false);
            Modal.info({ content: '성공적으로 삭제했습니다.' });
        } catch (e) {
            Modal.error({ content: '삭제 실패!! 디비에 존재하지 않는 값입니다.' });
            console.log(e);
            return null;
        }
        console.log(record);
    };

    //csv
    const headers = [{ label: '키워드 명', key: 'kwdName' }];

    //테이블 컬럼
    const columns: ColumnsType<keywordList> = [
        {
            title: '키워드 명',
            align: 'left',
            render: (record) => <span>{record.kwdName}</span>,
        },
        {
            title: '검수 키워드 삭제',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <Button
                    className={'pink'}
                    size={'large'}
                    onClick={() => deleteKeyWordButton(record)}
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
                        <h2 className="fz-24 fc-gray-700">검수 키워드 리스트</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span>검수 키워드 등록</span>
                        </Button>

                        <CSVLink
                            type="primary"
                            style={{ margin: '10px' }}
                            data={keywordList}
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
                        dataSource={keywordList}
                        pagination={{
                            total: keywordList?.length,
                            showTotal: showTotal,
                            size: 'default',
                        }}
                        bordered
                    />
                </div>
            </section>
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            <Modal
                className="ant-modal-content"
                title="검수 대상 키워드 등록"
                width={800}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        type="primary"
                        className="gray"
                        size={'large'}
                        onClick={() => modalHandle(false)}
                    >
                        <span>취소</span>
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        className="pink"
                        size={'large'}
                        onClick={() => modalHandle(true)}
                    >
                        <span>등록</span>
                    </Button>,
                ]}
            >
                <section className="wrap-section wrap-tbl">
                    <div className="box-body">
                        <div className="tbl">
                            <dl>
                                <dt>
                                    <div className="dt-inner">
                                        <span className="fz-16 fw-med fc-7">
                                            키워드 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            name="keywordName"
                                            placeholder="키워드 명을 입력하세요"
                                            value={input}
                                            onChange={(e) => setInput(e.currentTarget.value)}
                                            style={{
                                                width: '300px',
                                            }}
                                        />
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </section>
            </Modal>
        </>
    );
};
