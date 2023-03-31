import React, { useEffect, useState } from 'react';
import { Button, PaginationProps, Table } from 'antd';
import { AdAPIs } from '../../../api/AdAPIs';
import { confirmAdListType, currenStateAdListType } from '../../../DataType/ConfirmType';
import { ColumnsType } from 'antd/es/table';

export const CurrentStateAdList = () => {
    const { findCurrentStateAdLists } = AdAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [currentStateAdList, setCurrentStateAdList] = useState<currenStateAdListType[]>([]);

    //초기 세팅
    useEffect(() => {
        findCurrentStateAdLists()
            .then((res) => {
                console.log(res);
                setCurrentStateAdList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //테이블 컬럼
    const columns: ColumnsType<currenStateAdListType> = [
        {
            title: '직접광고 상세 ID',
            key: 'itemName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.key}</span>
            ),
        },
        {
            title: '상품 명',
            key: 'kwdName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.itemName}</span>
            ),
        },
        {
            title: '키워드 명',
            key: 'kwdName',
            align: 'center',
            render: (record) => (
                <span style={{ display: 'block', textAlign: 'left' }}>{record.kwdName}</span>
            ),
        },
        {
            title: '성인 여부',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {record.adultYn === 1 ? '성인 상품' : '일반 상품'}
                </span>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 현황</h2>
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        columns={columns}
                        dataSource={currentStateAdList}
                        pagination={{
                            total: currentStateAdList?.length,
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
