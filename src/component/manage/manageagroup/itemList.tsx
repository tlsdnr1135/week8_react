import { Button, Modal, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link, useLocation } from 'react-router-dom';
import { AdAPIs } from '../../../api/adAPIs';
import { ItemAPIs } from '../../../api/itemAPIs';
import { AdGroupList, ItemListCsv, ItemListDataType } from '../../../DataType/manageType';

interface props {
    itemList: ItemListDataType[];
    setItemList: React.Dispatch<React.SetStateAction<ItemListDataType[]>>;
    agroup: AdGroupList;
    setAgroup: React.Dispatch<React.SetStateAction<AdGroupList | undefined>>;
}
export const ItemList = ({ itemList, setItemList, agroup, setAgroup }: props) => {
    const location = useLocation();
    const { getItemListJoinAdWhereItemNameAndItemNo } = ItemAPIs(); //AgroupAPI
    const { updateAdOnOff, updateAdDeleteButton } = AdAPIs(); //AdApi
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [checkBoxList, setCheckBoxList] = useState<number[]>([]); //체크박스 리스트
    const [csv, setCsv] = useState<ItemListCsv[]>([]); //csv Data

    //초기 세팅 -> 유즈 이펙트
    useEffect(() => {
        getItemListJoinAdWhereItemNameAndItemNo({
            itemNo: '' as string,
            itemName: '' as string,
            advId: localStorage.getItem('ID') as string,
            agroupId: location.state.agroupId,
        })
            .then((res) => {
                console.log('그룹리스트 조회 버튼 눌렀을 때');
                console.log(res.data);
                let index = 1;
                res.data.forEach((item: ItemListDataType) => {
                    item.index = index;
                    index += 1;
                });
                setItemList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //csv
    const headers = [
        { label: '번호', key: 'key' },
        { label: '상품번호', key: 'itemNo' },
        { label: '상품명', key: 'itemName' },
        { label: '광고 상품 ON/OFF', key: 'adUseConfigYn' },
    ];

    //csvDataHandle
    const CsvOnClickHandle = () => {
        const CsvData: ItemListCsv[] = itemList.map((item) => ({
            key: 0,
            itemNo: item.itemNo,
            itemName: item.itemName,
            adUseConfigYn: item.adUseConfigYn,
            // itemCount: 0,
        }));
        let index = 1;
        CsvData.forEach((item) => {
            item.key = index;
            item.adUseConfigYn = item.adUseConfigYn === 1 ? 'ON' : 'OFF';
            index += 1;
        });
        setCsv(CsvData);
    };

    //테이블 체크박스
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ItemListDataType[]) => {
            const temp: number[] = [];
            selectedRows.forEach((item) => {
                temp.push(item.adId as number);
            });
            setCheckBoxList(temp);
            console.log(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    //ItemTable의 광고 사용 활성 여부 일괄 변경
    const itemListTableOnOffChangeAll = (e: any) => {
        console.log(e.target.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            Modal.warning({ content: '체크 박스를 먼저 골라주세요.' });
            return null;
        }
        console.log('리턴 널 체크');
        //Api
        updateAdOnOff({ idList: checkBoxList, yn: e.target.value })
            .then((res) => {
                console.log(res);
                getItemListJoinAdWhereItemNameAndItemNo({
                    itemNo: '' as string,
                    itemName: '' as string,
                    advId: localStorage.getItem('ID') as string,
                    agroupId: location.state.agroupId,
                })
                    .then((res) => {
                        console.log('ItemTable의 광고 사용 활성 여부 일괄 변경');
                        console.log(res.data);
                        let index = 1;
                        res.data.forEach((item: ItemListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setItemList(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                Modal.info({ content: '광고 상품 상태가 변경되었습니다.' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //ItemTable의 광고 상품 삭제
    const deleteAdUseConfigYn = (e: any) => {
        console.log(e.target.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            Modal.warning({ content: '체크 박스를 먼저 골라주세요.' });
            return null;
        }
        console.log('리턴 널 체크');

        //Api
        updateAdDeleteButton({ idList: checkBoxList, yn: e.target.value })
            .then((res) => {
                console.log(res);
                getItemListJoinAdWhereItemNameAndItemNo({
                    itemNo: '' as string,
                    itemName: '' as string,
                    advId: localStorage.getItem('ID') as string,
                    agroupId: location.state.agroupId,
                })
                    .then((res) => {
                        console.log('ItemTable의 광고 사용 활성 여부 일괄 변경');
                        console.log(res.data);
                        let index = 1;
                        res.data.forEach((item: ItemListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setItemList(res.data);
                        // let temp = agroup;
                        agroup.adActYn = (agroup.adActYn as number) - 1;
                        setAgroup(agroup);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                Modal.info({ content: '광고 상품이 삭제되었습니다' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //ItemTable의 광고 사용 활성 여부 변경 On/Off (버튼x)
    const itemListTableOnOffChange = (e: any) => {
        console.log(e.target.value);
        const temp: number[] = [];
        temp.push(itemList?.[e.target.value].adId);
        updateAdOnOff({ idList: temp, yn: itemList?.[e.target.value].adUseConfigYn == 1 ? 0 : 1 })
            .then((res) => {
                console.log(res);
                getItemListJoinAdWhereItemNameAndItemNo({
                    itemNo: '' as string,
                    itemName: '' as string,
                    advId: localStorage.getItem('ID') as string,
                    agroupId: location.state.agroupId,
                })
                    .then((res) => {
                        console.log('ItemTable의 광고 사용 활성 여부 일괄 변경');
                        console.log(res.data);
                        let index = 1;
                        res.data.forEach((item: ItemListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setItemList(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                Modal.info({ content: '광고 상품이 삭제되었습니다' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //테이블 컬럼
    const columns: ColumnsType<ItemListDataType> = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            render: (value, record, index) => <span>{record.index}</span>,
        },
        {
            title: '상품번호',
            key: 'itemNo',
            dataIndex: 'itemNo',
            align: 'center',
            render: (value, record, index) => (
                <Link
                    to={'/manageitem'}
                    state={{
                        adId: record.adId,
                    }}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    {record.itemNo}
                </Link>
            ),
        },
        {
            title: '상품명',
            key: 'itemName',
            dataIndex: 'itemName',
            align: 'center',
        },
        {
            title: '광고 상품 ON/OFF',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <button
                    value={index}
                    onClick={itemListTableOnOffChange}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {record.adUseConfigYn === 1 ? 'ON' : 'OFF'}
                </button>
            ),
        },
    ];

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">상품 조회 결과</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray "
                            value={1}
                            onClick={itemListTableOnOffChangeAll}
                        >
                            <span>ON</span>
                        </Button>
                        <Button
                            type="primary"
                            className="white "
                            size={'large'}
                            value={0}
                            onClick={itemListTableOnOffChangeAll}
                        >
                            <span>OFF</span>
                        </Button>
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            value={0}
                            onClick={deleteAdUseConfigYn}
                        >
                            <span>광고 상품 삭제</span>
                        </Button>

                        <CSVLink
                            data={csv}
                            headers={headers}
                            // onClick={CsvOnClickHandle}
                            filename={`Test`}
                        >
                            <Button
                                type="primary"
                                className="white"
                                size={'large'}
                                value={'CANCEL'}
                                onClick={CsvOnClickHandle}
                            >
                                {' '}
                                <span>광고 상품 다운로드</span>
                            </Button>
                        </CSVLink>
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={itemList}
                        pagination={{
                            total: itemList?.length,
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
