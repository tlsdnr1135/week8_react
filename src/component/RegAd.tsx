import React, { useEffect, useState } from 'react';

import {
    Button,
    Input,
    message,
    Modal,
    Pagination,
    PaginationProps,
    Select,
    Space,
    Table,
    Tag,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import useLoginStore, { useLoginState } from '../store/useLoginStore';
import API, { APIs } from '../api/ApiService';

interface DataType {
    id: number;
    key: number;
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number | string; //성인 여부 default:true(1)
    itemOrgCost: number; //상품 원본 금액
    itemActYn: number | string; //상품 활성 여부
}
export interface KeyWordType {
    kwdName: string;
    bidCost: number;
}
interface KeyWordTableType {
    id: number;
    key: number | undefined;
    kwdName: string;
    manualCnrKwd: number;
    sellPossKwdYn: number;
}
interface PickButtonType {
    id: number; // 상품 아이디
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number; //성인 여부 default:true(1)
}
interface SelecterType {
    key: number; //agroupId
    value: string; //그룹 명
    label: string;
    regTime: string;
    agroupActYn: number;
    agroupUseActYn: number;
}
interface SelectApiType {
    itemnumber: string;
    itemname: string;
}
export const RegAd = () => {
    const { getItemList, getAgroupSelectBoxList, setAd } = APIs();
    const { email } = useLoginState();
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [level, setLevel] = useState(0); //레벨별 컴포넌트 보여주는 변수
    const [data, setData] = useState<DataType[]>(); //상품

    //*********************************************************************************************
    //*********************************************************************************************
    //*********************************************************************************************
    //*****************************상품 조회********************************************************
    const [itemNo, setItmeNo] = useState('');
    const [itemName, setItmeName] = useState('');

    //상품 조회 Input 핸들러
    const itemNameHandler = (e: any) => {
        setItmeName(e.target.value);
    };
    const itemNoHandler = (e: any) => {
        setItmeNo(e.target.value);
    };

    //조회 버튼(상품 조회)
    const selectButton = (e: any) => {
        const parameter = { itemNo: itemNo, itemName: itemName };

        getItemList(parameter)
            .then((response) => {
                const temp = response.data.items;
                temp.forEach((item: DataType) => {
                    item.key = item.id;
                    if (item.adultYn === 0) {
                        item.adultYn = 'NO';
                    } else {
                        item.adultYn = 'YES';
                    }
                    if (item.itemActYn === 0) {
                        item.itemActYn = '비활성화';
                    } else {
                        item.itemActYn = '활성화';
                    }
                });
                console.log('상품 조회 response = ', temp);
                setData(temp); //상품 조회 테이블
            })
            .catch((error) => {
                console.log(error);
            });
        setLevel(1); //상품 조회 결과 보여주기
    };

    //*********************************************************************************************
    //*********************************************************************************************
    //*********************************************************************************************
    //***********************************상품 선택**************************************************
    const [messageApi, contextHolder] = message.useMessage(); //Validation 메시지
    const [agroup, setAgroup] = useState<SelecterType[]>([]); //광고 그룹 셀렉터
    const [pick, setPickButton] = useState<PickButtonType>(); //선택한 상품 정보 테이블
    const [kwdTable, setKwdTable] = useState<KeyWordTableType>();
    const [selectGroup, setSelectGroup] = useState<{ label: string; value: string }>({
        label: '광고그룹을 선택해 주세요',
        value: '광고그룹을 선택해 주세요',
    }); //광고 최종 등록할 때 필요

    // 메시지
    // 선택 버튼
    const pickButton = (e: any) => {
        //비활성화 메시지를 위한 index찾기 작업
        console.log(e.target.value); //id값
        let index = data?.findIndex((item) => item.id == e.target.value);
        console.log('인덱스 값', index); //id값으로 찾은 index값

        if ((data?.[index as number].itemActYn as string) === '비활성화') {
            messageApi.info('비활성화다');
            if ((data?.[index as number].itemActYn as string) === '비활성화') {
                setLevel(1);
            }
            return null;
        }

        //선택 시 광고그룹 셀렉터 불러오기
        getAgroupSelectBoxList()
            .then((response) => {
                console.log(response.data.agroupFindResDtos);
                const group = response.data.agroupFindResDtos.map((item: any) => ({
                    key: item.id,
                    value: item.agroupName,
                    label: item.agroupName,
                    regTime: item.regTime,
                    agroupActYn: item.agroupActYn,
                    agroupUseActYn: item.agroupUseActYn,
                }));
                setAgroup(group);
                // setSelectGroup({
                //     label: response.data.agroupFindResDtos[0].agroupName,
                //     value: response.data.agroupFindResDtos[0].agroupName,
                // });
            })
            .catch((error) => {
                console.log(error);
            });

        //누를 때 마다 선택한 상품 정보 바뀌어야 함.
        console.log('Agroup : ', agroup);
        const temp = {
            id: data?.[index as number].id as number,
            itemNo: data?.[index as number].itemNo as string,
            itemName: data?.[index as number].itemName as string,
            adultYn: data?.[index as number].adultYn as number,
        };
        setPickButton(temp);

        setLevel(2);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '상품번호',
            dataIndex: 'itemNo',
            key: 'itemNo',
            align: 'center',
        },
        {
            title: '상품명',
            dataIndex: 'itemName',
            key: 'itemName',
            align: 'center',
        },
        {
            title: '성인 상품 여부',
            dataIndex: 'adultYn',
            key: 'adultYn',
            align: 'center',
        },
        {
            title: '상품 가격',
            key: 'itemOrgCost',
            dataIndex: 'itemOrgCost',
            align: 'center',
        },
        {
            title: '상품 활성화 여부',
            key: 'itemActYn',
            dataIndex: 'itemActYn',
            align: 'center',
        },
        {
            title: '상품 선택',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <Button
                    className={
                        'ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink'
                    }
                    value={record.id}
                    onClick={pickButton}
                    size="middle"
                >
                    <a>선택</a>
                </Button>
            ),
        },
    ];
    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************
    //**** 광고 그룹 모달창 *********************************************************************************************
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        //셀렉트 박스 추가
        let temp = {
            key: 1,
            value: input,
            label: input,
            regTime: input,
            agroupActYn: 1,
            agroupUseActYn: 1,
        };
        setAgroup([...agroup, temp]);
        setInput('');
        let selectGroups = {
            // value: 'sdsd',
            // label: 'sdd',
            value: input,
            label: input,
        };
        setSelectGroup(selectGroups);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setInput('');
        setIsModalOpen(false);
    };

    const madalInput = (e: any) => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        setInput(e.target.value);
        console.log(`selected `, e.target.value);
    };
    const handleChange = (value: string) =>
        setSelectGroup({
            value: value,
            label: value,
        });

    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************
    //**** 키워드 모달창 *********************************************************************************************
    const [isKeyWordModalOpen, setIsKeyWordModalOpen] = useState(false);
    const [keyWord, setkeyWord] = useState('');
    const [bidCost, setBidCost] = useState(0);
    const [keywordTable, setKeywordTable] = useState<KeyWordType[]>();

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
        if (keywordTable == null) {
            let temparr = [];
            temparr.push(temp);
            setKeywordTable(temparr);
        } else {
            let count = 0;
            keywordTable.forEach((items) => {
                if (items.kwdName == keyWord) {
                    count = -1;
                    messageApi.info('현재 동일한 키워드명이 존재합니다.');
                }
            });
            if (count === -1) {
                return null;
            }
            setKeywordTable([...keywordTable, temp]);
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
        setKeywordTable(keywordTable?.filter((_, index) => index !== parseInt(e.target.value)));
        console.log(keywordTable);
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

    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************
    //**** 입찰가 모달창 *********************************************************************************************
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
        const sameBid = keywordTable?.map((element: KeyWordType) => ({
            kwdName: element.kwdName,
            bidCost: bidCostInput2 as number,
            // bidCost: element.bidCost,
        }));
        setBidCostInput2(0);
        setKeywordTable(sameBid);
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

    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************
    const regAdEvent = () => {
        console.log('꾸루꾸루꾸 : ', localStorage.getItem('ID'));
        const parameter = {
            adv: {
                name: localStorage.getItem('ID') as string,
            },
            agroup: {
                agroupName: selectGroup.value as string,
            },
            item: {
                id: pick?.id as number,
            },
            kwd: keywordTable!,
        };
        console.log(parameter);
        setAd(parameter)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //****************************************************************************************************************
    //****************************************************************************************************************
    //****************************************************************************************************************

    return (
        <>
            {contextHolder}
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 등록</h1>
                        </div>
                        <div className="content-body">
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 0 && ( //인풋
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <div className="box-left">
                                                <h2 className="fz-24 fc-gray-700">상품 조회</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="tbl">
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            상품명
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <Input
                                                            name="itemName"
                                                            placeholder="상품명을 입력하세요."
                                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                                            type="text"
                                                            // value={itemName}
                                                            onChange={itemNameHandler}
                                                            style={{ width: '500px' }}
                                                        />
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            상품번호
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <Input
                                                            name="itemNo"
                                                            placeholder="상품번호을 입력하세요."
                                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                                            type="text"
                                                            // value={itemNo}
                                                            onChange={itemNoHandler}
                                                            // defaultValue
                                                            style={{ width: '500px' }}
                                                        />
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <div className="box-center">
                                            <Button
                                                type="primary"
                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                                                value={1}
                                                onClick={selectButton}
                                            >
                                                <span>조회</span>
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 1 && ( //조회 표
                                <section className="wrap-section wrap-datagrid">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">상품 조회 결과</h2>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        {/*    테이블 자리*/}
                                        <Table
                                            columns={columns}
                                            dataSource={data}
                                            pagination={{
                                                total: data?.length,
                                                showTotal: showTotal,
                                                size: 'default',
                                            }}
                                            bordered
                                        />
                                    </div>
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 2 && ( //데이터 표
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <div className="box-left">
                                                <h2 className="fz-24 fc-gray-700">
                                                    선택한 상품 정보
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="tbl">
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            상품번호
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-14 fc-gray-400">
                                                                        {pick?.itemNo}
                                                                    </b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            상품명
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-14 fc-gray-400">
                                                                        {pick?.itemName}
                                                                    </b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            성인여부
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-14 fc-gray-400">
                                                                        {pick?.adultYn}
                                                                    </b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {level >= 2 && ( //광고그룹
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">광고 그룹 선택</h2>
                                        </div>
                                        <div className="box-right">
                                            <Button
                                                type="primary"
                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                                                onClick={showModal}
                                            >
                                                <span>신규 그룹 생성</span>
                                            </Button>
                                            ;
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="tbl">
                                            <dl>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-15 fc-gray-500">
                                                            광고 그룹
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <Select
                                                            style={{ width: 250 }}
                                                            // onClick={onclickSelecter}
                                                            // onClick={handleChange}
                                                            onChange={handleChange}
                                                            placeholder="광고그룹을 선택해주세요"
                                                            value={selectGroup.value}
                                                            options={agroup}
                                                        />
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {level >= 2 && (
                                <section className="wrap-section wrap-datagrid">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">
                                                광고 키워드 리스트
                                            </h2>
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
                                            dataSource={keywordTable}
                                            pagination={{
                                                total: keywordTable?.length,
                                                showTotal: showTotal,
                                                size: 'default',
                                            }}
                                            bordered
                                        />
                                    </div>
                                    {/* ************************************************************************************ */}
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 2 && (
                                <div className="box-footer">
                                    <div className="box-center">
                                        <Button
                                            type="primary"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg ant-btn-block pink"
                                            onClick={regAdEvent}
                                        >
                                            <span>광고 등록</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                        </div>
                    </div>
                </div>
            </main>
            {/* ***************************************************************************************************************************************** */}
            {/* ***************************************************************************************************************************************** */}
            <Modal
                className="ant-modal-content"
                title="신규 광고 그룹 생성"
                width={800}
                open={isModalOpen}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={[
                    <>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                            onClick={handleCancel}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                            onClick={handleOk}
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
                                            신규 광고그룹 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            name="groupName"
                                            value={input}
                                            onChange={madalInput}
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
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
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
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
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
    );
};
