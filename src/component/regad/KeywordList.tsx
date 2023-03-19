import React, { useState } from 'react';
import { Button, Input, message, Modal, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { KeyWordType } from '../../DataType/RedAdType';

interface AgroupSelecter {
    keywordTables: KeyWordType[];
    setKeywordTables: React.Dispatch<React.SetStateAction<KeyWordType[] | undefined>>;
}
export const KeywordList = ({ keywordTables, setKeywordTables }: AgroupSelecter) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [messageApi, contextHolder] = message.useMessage(); //Validation 메시지
    const [isKeyWordModalOpen, setIsKeyWordModalOpen] = useState(false);
    const [keyWord, setkeyWord] = useState('');
    const [bidCost, setBidCost] = useState(0);

    /* *************************************************************** */
    /* ***************키워드 모달창************************************* */
    const showKeyWordModal = () => {
        setIsKeyWordModalOpen(true);
    };
    const KeyWordHandleOk = () => {
        //Input가져오기
        let temp = {
            kwdName: keyWord,
            bidCost: bidCost,
        };

        if (bidCost < 90) {
            messageApi.info('입찰가는 최소 90원을 입력해야 합니다.');
            return null;
        } else if (bidCost > 99000) {
            messageApi.info('입찰가는 최대 99000원을 입력해야 합니다.');
            return null;
        }

        //초기에 값이 없으면 배열 만들어주기
        if (keywordTables == null) {
            let temparr = [];
            temparr.push(temp);
            setKeywordTables(temparr);
        } else {
            let count = 0;
            keywordTables.forEach((items) => {
                if (items.kwdName == keyWord) {
                    count = -1;
                    messageApi.info('현재 동일한 키워드명이 존재합니다.');
                }
            });
            if (count === -1) {
                return null;
            }
            setKeywordTables([...keywordTables, temp]);
        }
        console.log('***************************************************************');
        setkeyWord('');
        setBidCost(0);
        setIsKeyWordModalOpen(false);
    };

    const KeyWordHandleCancel = () => {
        console.log('캔슬');
        setkeyWord('');
        setBidCost(0);
        console.log(keyWord);
        setIsKeyWordModalOpen(false);
    };

    const KeywordMadalInput = (e: any) => {
        setkeyWord(e.target.value);
        console.log(`selected `, e.target.value);
    };
    const bidCostMadalInput = (e: any) => {
        setBidCost(e.target.value);
        console.log(`selected `, e.target.value);
    };
    const deleteKeyword = (e: any) => {
        console.log();
        console.log(e.target.value);
        //키워드 테이블 삭제
        setKeywordTables(keywordTables?.filter((_, index) => index !== parseInt(e.target.value)));
        console.log(keywordTables);
    };

    /* *************************************************************** */
    /* ***************입찰가 모달창************************************* */
    const [isBidCostModalOpen, setIsBidCostModalOpen] = useState(false);
    const [bidCostInput2, setBidCostInput2] = useState(0);

    const bidCostShowModal = () => {
        setIsBidCostModalOpen(true);
    };

    const bidCostHandleOk = () => {
        if (bidCostInput2 < 90) {
            messageApi.info('입찰가는 최소 90원을 입력해야 합니다.');
            return null;
        } else if (bidCostInput2 > 99000) {
            messageApi.info('입찰가는 최대 99000원을 입력해야 합니다.');
            return null;
        }
        //셀렉트 박스 추가
        const sameBid = keywordTables?.map((element: KeyWordType) => ({
            kwdName: element.kwdName,
            bidCost: bidCostInput2 as number,
            // bidCost: element.bidCost,
        }));
        setBidCostInput2(0);
        setKeywordTables(sameBid);
        setIsBidCostModalOpen(false);
    };

    const bidCostHandleCancel = () => {
        setBidCostInput2(0);
        setIsBidCostModalOpen(false);
    };

    const bidCostModalInput2 = (e: any) => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        setBidCostInput2(e.target.value);
        console.log(`selected `, e.target.value);
    };

    const keywordColumns: ColumnsType<KeyWordType> = [
        {
            title: '키워드명',
            dataIndex: 'kwdName',
            key: 'kwdName',
            align: 'center',
        },
        {
            title: '입찰가',
            dataIndex: 'bidCost',
            key: 'bidCost',
            align: 'center',
        },
        {
            title: '키워드 삭제',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <Button
                    className={
                        'ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink'
                    }
                    value={index}
                    onClick={deleteKeyword}
                    size="middle"
                >
                    <a>삭제</a>
                </Button>
            ),
        },
    ];
    return (
        <>
            {contextHolder}
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 키워드 리스트</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default pink"
                            onClick={showKeyWordModal}
                        >
                            <span>키워드 추가</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default gray"
                            onClick={bidCostShowModal}
                        >
                            <span>입찰가 일괄 설정</span>
                        </Button>
                    </div>
                </div>
                {/* ************************************************************************************ */}
                <div className="box-body">
                    <Table
                        columns={keywordColumns}
                        dataSource={keywordTables}
                        pagination={{
                            total: keywordTables?.length,
                            showTotal: showTotal,
                            size: 'default',
                        }}
                        bordered
                    />
                </div>
                {/* ************************************************************************************ */}
            </section>
            {/* ************************************************************************************ */}
            {/* ************************************************************************************ */}
            {/* ************************************************************************************ */}
            <>
                <Modal
                    className="ant-modal-content"
                    title="키워드 추가"
                    width={800}
                    open={isKeyWordModalOpen}
                    footer={[
                        <>
                            <Button
                                type="primary"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                                onClick={KeyWordHandleCancel}
                            >
                                <span>취소</span>
                            </Button>
                            <Button
                                type="primary"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                                onClick={KeyWordHandleOk}
                            >
                                <span>등록</span>
                            </Button>
                        </>,
                    ]}
                >
                    <section className="wrap-section wrap-tbl">
                        <div className="box-body">
                            <div className="tbl">
                                <dl>
                                    <dt>
                                        <div className="dt-inner">
                                            <span className="fz-16 fw-med fc-7">
                                                키워드명 입력<i className="txt-essential"></i>
                                            </span>
                                        </div>
                                    </dt>
                                    <dd>
                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                name="addKwdName"
                                                onChange={KeywordMadalInput}
                                                className="ant-input css-dev-only-do-not-override-1me4733"
                                                value={keyWord}
                                                style={{ width: '300px' }}
                                            />
                                        </div>
                                    </dd>
                                </dl>
                                <dl>
                                    <dt>
                                        <div className="dt-inner">
                                            <span className="fz-16 fw-med fc-7">
                                                입찰가 입력<i className="txt-essential"></i>
                                            </span>
                                        </div>
                                    </dt>
                                    <dd>
                                        <div className="form-group">
                                            <Input
                                                type="number"
                                                name="addKwdBidCost"
                                                onChange={bidCostMadalInput}
                                                className="ant-input css-dev-only-do-not-override-1me4733"
                                                value={bidCost}
                                                style={{ width: '300px' }}
                                            />
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </section>
                </Modal>
            </>
            {/*  입찰가 모달찰 */}
            <>
                <Modal
                    className="ant-modal-content"
                    title="키워드 입찰가 일괄 설정"
                    width={800}
                    open={isBidCostModalOpen}
                    footer={[
                        <>
                            <Button
                                type="primary"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                                onClick={bidCostHandleCancel}
                            >
                                <span>취소</span>
                            </Button>
                            <Button
                                type="primary"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                                onClick={bidCostHandleOk}
                            >
                                <span>등록</span>
                            </Button>
                        </>,
                    ]}
                >
                    <section className="wrap-section wrap-tbl">
                        <div className="box-body">
                            <div className="tbl">
                                <dl>
                                    <dt>
                                        <div className="dt-inner">
                                            <span className="fz-16 fw-med fc-7">
                                                입찰가 입력<i className="txt-essential"></i>
                                            </span>
                                        </div>
                                    </dt>
                                    <dd>
                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                name="groupName"
                                                value={bidCostInput2}
                                                onChange={bidCostModalInput2}
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
        </>
    );
};
