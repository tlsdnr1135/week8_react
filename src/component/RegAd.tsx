import React, { useEffect, useState } from 'react';

import { Button, Input, Modal, Pagination, PaginationProps, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import useLoginStore from '../zustandStore';
import API from '../api/ApiService';

// private String itemNo;//상품 번호
//
// private String itemName;//상품 명
//
// private Integer adultYn;//성인 여부 default:true(1)
//
// private Long itemOrgCost;//상품 원본 금액
//
// private Integer itemActYn;//상품 활성 여부
interface DataType {
    id: number;
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number; //성인 여부 default:true(1)
    itemOrgCost: number; //상품 원본 금액
    itemActYn: number; //상품 활성 여부
    // tags: string[];
}
interface PickButtonType {
    itemNo: string; //상품번호
    itemName: string; //상품 명
    adultYn: number; //성인 여부 default:true(1)
    defaultV: string;
}
interface SelecterType {
    value: string; //그룹 명
    label: string;
}

export const RegAd = () => {
    const [agroup, setAgroup] = useState<SelecterType[]>([
        {
            value: 'none',
            label: '없음',
        },
    ]);
    const [defaultV, setDefaultV] = useState('없당.');
    const [level, setLevel] = useState(0);
    console.log('체인지 레벨');
    const [data, setData] = useState<DataType[]>();
    const dataRe: DataType[] | undefined = data;
    // let sdsdssds = dataRe?[0].itemName;
    // const plusLevel = (s: number) => {
    //     setLevelel(s);
    // };

    //조회 버튼
    const selectButton = (e: any) => {
        API.get('/api/item/find')
            .then((response) => {
                let datas: any = [];
                response.data.items.map((element: any) => {
                    datas.push({
                        id: element.id,
                        itemNo: element.itemNo,
                        itemName: element.itemName,
                        adultYn: element.adultYn,
                        itemOrgCost: element.itemOrgCost,
                        itemActYn: element.itemActYn,
                    });
                });
                setData(datas);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        setLevel(1);
    };

    const [pick, setPickButton] = useState<PickButtonType>({
        itemNo: '',
        itemName: '',
        adultYn: 1,
        defaultV: '없으',
    });
    // 선택 버튼
    const pickButton = (e: any) => {
        let datas: any = [];
        API.get('/api/agroup/find')
            .then((response) => {
                console.log('냠냠냠냠냠');
                console.log(response.data.agroups);
                response.data.agroups.map((element: any) => {
                    datas.push({
                        value: element.agroupName,
                        label: element.agroupName,
                    });
                });
                setAgroup(datas);
                console.log('냠냠냠냠냠');
            })
            .catch((error) => {
                console.log(error);
            });
        //누를 때 마다 선택한 상품 정보 바뀌어야 함.
        console.log(parseInt(e.target.value));

        console.log(agroup);
        const x = {
            itemNo: dataRe?.[parseInt(e.target.value)].itemNo as string,
            itemName: dataRe?.[parseInt(e.target.value)].itemName as string,
            adultYn: dataRe?.[parseInt(e.target.value)].adultYn as number,
            defaultV: 'sd',
        };
        setDefaultV(x.defaultV);
        setPickButton(x);
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
                    value={index}
                    onClick={pickButton}
                    size="middle"
                >
                    <a>선택</a>
                </Button>
            ),
        },
    ];
    //****************************************************************************************************************
    const [isModalOpen, setIsModalOpen] = useState(false);
    let input = '';

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (e: any) => {
        console.log(e.value);
        console.log(input);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const makeAgroup = () => {};
    //****************************************************************************************************************
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;

    //광고 그룹 모달 클릭시

    const onclickSelecter = () => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        API.get('/api/agroup/find')
            .then((response) => {
                console.log('냠냠냠냠냠');
                console.log(response.data.agroups);
                let datas: any = [];
                response.data.agroups.map((element: any) => {
                    datas.push({
                        value: element.agroupName,
                        label: element.agroupName,
                    });
                });
                setAgroup(datas);
                console.log('냠냠냠냠냠');
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleChange = (value: string) => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        console.log(`selected ${value}`);
    };

    const madalInput = (e: any) => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        input = e.target.value;
        console.log(`selected `, e.target.value);
    };

    //값을 가져오기 위한

    useEffect(() => {
        console.log('-----------------------------');
        console.log(defaultV);
        console.log(agroup[0].value);
        setDefaultV(agroup[0].value);
    }, [agroup]);

    //모든 axios요청 헤더에 토큰 싣어 보내기
    return (
        <>
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
                                            dataSource={dataRe}
                                            pagination={{
                                                total: dataRe?.length,
                                                showTotal: showTotal,
                                                size: 'default',
                                            }}
                                            bordered
                                        />
                                        {/*<Pagination*/}
                                        {/*    size="small"*/}
                                        {/*    total={50}*/}
                                        {/*    showTotal={showTotal}*/}
                                        {/*></Pagination>*/}
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
                                                                        {pick.itemNo}
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
                                                                        {pick.itemName}
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
                                                                        {pick.adultYn}
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
                                                            style={{ width: 120 }}
                                                            onClick={onclickSelecter}
                                                            // onChange={handleChange}
                                                            defaultValue={defaultV}
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
                                            >
                                                <span>키워드 추가</span>
                                            </Button>
                                            <Button
                                                type="primary"
                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default gray"
                                            >
                                                <span>입찰가 일괄 설정</span>
                                            </Button>
                                        </div>
                                    </div>
                                    {/* ************************************************************************************ */}
                                    <div className="box-body">
                                        <div className="ant-table-wrapper css-dev-only-do-not-override-1me4733">
                                            <div className="ant-spin-nested-loading css-dev-only-do-not-override-1me4733">
                                                <div className="ant-spin-container">
                                                    <div className="ant-table ant-table-bordered ant-table-empty">
                                                        <div className="ant-table-container">
                                                            <div className="ant-table-content">
                                                                <table
                                                                    style={{ tableLayout: 'auto' }}
                                                                >
                                                                    <colgroup />
                                                                    <thead className="ant-table-thead">
                                                                        <tr>
                                                                            <th
                                                                                className="ant-table-cell"
                                                                                scope="col"
                                                                                style={{
                                                                                    textAlign:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                키워드명
                                                                            </th>
                                                                            <th
                                                                                className="ant-table-cell"
                                                                                scope="col"
                                                                                style={{
                                                                                    textAlign:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                입찰가
                                                                            </th>
                                                                            <th
                                                                                className="ant-table-cell"
                                                                                scope="col"
                                                                                style={{
                                                                                    textAlign:
                                                                                        'center',
                                                                                }}
                                                                            >
                                                                                키워드 삭제
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="ant-table-tbody">
                                                                        <tr className="ant-table-placeholder">
                                                                            <td
                                                                                className="ant-table-cell"
                                                                                colSpan={3}
                                                                            >
                                                                                <div className="css-dev-only-do-not-override-1me4733 ant-empty ant-empty-normal">
                                                                                    <div className="ant-empty-image">
                                                                                        <svg
                                                                                            width={
                                                                                                64
                                                                                            }
                                                                                            height={
                                                                                                41
                                                                                            }
                                                                                            viewBox="0 0 64 41"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                        >
                                                                                            <g
                                                                                                transform="translate(0 1)"
                                                                                                fill="none"
                                                                                                fillRule="evenodd"
                                                                                            >
                                                                                                <ellipse
                                                                                                    fill="#f5f5f5"
                                                                                                    cx={
                                                                                                        32
                                                                                                    }
                                                                                                    cy={
                                                                                                        33
                                                                                                    }
                                                                                                    rx={
                                                                                                        32
                                                                                                    }
                                                                                                    ry={
                                                                                                        7
                                                                                                    }
                                                                                                />
                                                                                                <g
                                                                                                    fillRule="nonzero"
                                                                                                    stroke="#d9d9d9"
                                                                                                >
                                                                                                    <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                                                                                                    <path
                                                                                                        d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                                                                                        fill="#fafafa"
                                                                                                    />
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="ant-empty-description">
                                                                                        No data
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                            defaultValue=""
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
        </>
    );
};
