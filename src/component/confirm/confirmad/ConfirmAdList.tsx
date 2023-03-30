import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, PaginationProps, Table } from 'antd';
import { confirmAdListType } from '../../../DataType/ConfirmType';
import { DadDetAPIs } from '../../../api/DadDetAPIs';
import { setIndex } from '../confirmkeyword/ConfirmKeywordSearch';
import { ColumnsType } from 'antd/es/table';

interface props {
    confirmAdList: confirmAdListType[];
    setConfirmAdList: React.Dispatch<React.SetStateAction<confirmAdListType[]>>;
}
export const ConfirmAdList = ({ confirmAdList, setConfirmAdList }: props) => {
    const { getDaddetListsJoinAdkwdItem } = DadDetAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [isModalOpen, setIsModalOpen] = useState(false); //모달
    const [confirmData, setConfirmData] = useState<confirmAdListType>();

    //초기 세팅
    useEffect(() => {
        getDaddetListsJoinAdkwdItem({ kwdName: '' })
            .then((res) => {
                console.log(res);
                const data = setIndex(res.data);
                setConfirmAdList(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //검수 처리 버튼
    const confirmButton = (record: confirmAdListType) => {
        setConfirmData(record);
        setIsModalOpen(true);
        console.log('sd');
    };

    //테이블 컬럼
    const columns: ColumnsType<confirmAdListType> = [
        {
            title: '상품 명',
            key: 'itemName',
            align: 'left',
            render: (record) => <span>{record.itemName}</span>,
        },
        {
            title: '키워드 명',
            key: 'kwdName',
            align: 'left',
            render: (record) => <span>{record.kwdName}</span>,
        },
        {
            title: '검수 사유',
            key: 'kwdName',
            align: 'left',
            render: (record) => <span>검수 대상 키워드 : {record.kwdName}</span>,
        },
        {
            title: '검수 처리',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <Button className={'pink'} size={'large'} onClick={() => confirmButton(record)}>
                    검수
                </Button>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 검수 대상 리스트</h2>
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        columns={columns}
                        dataSource={confirmAdList}
                        pagination={{
                            total: confirmAdList?.length,
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
                title="검수 처리"
                width={800}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        type="primary"
                        className="gray"
                        size={'large'}
                        // onClick={() => modalHandle(false)}
                    >
                        <span>반려</span>
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        className="pink"
                        size={'large'}
                        // onClick={() => modalHandle(true)}
                    >
                        <span>승인</span>
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
                                            상품 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div style={{ paddingTop: '18px' }}>
                                        <span className="fz-16 fw-med fc-7">
                                            {confirmData?.itemName}
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <div className="dt-inner">
                                        <span className="fz-16 fw-med fc-7">
                                            키워드 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div style={{ paddingTop: '18px' }}>
                                        <span className="fz-16 fw-med fc-7">
                                            {confirmData?.kwdName}
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    <div className="dt-inner">
                                        <span className="fz-16 fw-med fc-7">검수 사유</span>
                                    </div>
                                </dt>
                                <dd>
                                    <div style={{ paddingTop: '18px' }}>
                                        <span className="fz-16 fw-med fc-7">
                                            검수 대상 키워드 : {confirmData?.kwdName}
                                        </span>
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
