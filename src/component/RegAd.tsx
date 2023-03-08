import React, { useState } from 'react';

import { Button, Input, Select, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: '상품번호',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '상품명',
        dataIndex: 'age',
        key: 'age',
        align: 'center',
    },
    {
        title: '성인 상품 여부',
        dataIndex: 'address',
        key: 'address',
        align: 'center',
    },
    {
        title: '상품 가격',
        key: 'tags',
        dataIndex: 'tags',
        align: 'center',
    },
    {
        title: '상품 활성화 여부',
        key: 'tags',
        dataIndex: 'tags',
        align: 'center',
    },
    {
        title: '상품 선택',
        key: 'action',
        align: 'center',
        render: (_, record) => (
            <Button
                className={
                    'ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink'
                }
                size="middle"
            >
                <a>선택</a>
            </Button>
        ),
    },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        tags: ['nice', 'developer'],
    });
}

export const RegAd = () => {
    const [level, setLevel] = useState(0); //단계를 다섯개 만들기 store에다가
    const plusLevel = () => {
        setLevel(level + 1);
    };
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
                            {level >= 0 && (
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
                                                onClick={plusLevel}
                                            >
                                                <span>조회</span>
                                            </Button>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 1 && (
                                <section className="wrap-section wrap-datagrid">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">상품 조회 결과</h2>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        {/*    테이블 자리*/}
                                        <Table columns={columns} dataSource={data} bordered />
                                    </div>
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 2 && (
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
                                                                        NBS_DB10
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
                                                                        상품상품10
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
                                                                        성인상품
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
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 3 && (
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">광고 그룹 선택</h2>
                                        </div>
                                        <div className="box-right">
                                            <Button
                                                type="primary"
                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                                            >
                                                <span>신규 그룹 생성</span>
                                            </Button>
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
                                                            defaultValue="lucy"
                                                            style={{ width: 120 }}
                                                            // onChange={handleChange}
                                                            options={[
                                                                { value: 'jack', label: 'Jack' },
                                                                { value: 'lucy', label: 'Lucy' },
                                                                {
                                                                    value: 'Yiminghe',
                                                                    label: 'yiminghe',
                                                                },
                                                                {
                                                                    value: 'disabled',
                                                                    label: 'Disabled',
                                                                    disabled: true,
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            )}
                            {/* ***************************************************************************************************** */}
                            {/* ***************************************************************************************************** */}
                            {level >= 4 && (
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
                            {level >= 5 && (
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
        </>
    );
};
