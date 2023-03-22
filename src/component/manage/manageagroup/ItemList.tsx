import React, { useEffect, useState } from 'react';
import { AdGroupList, ItemListDataType } from '../../../DataType/ManageType';
import { Button, PaginationProps, Table } from 'antd';
import { CSVLink } from 'react-csv';
import { ColumnsType } from 'antd/es/table';
import { Link, useLocation } from 'react-router-dom';
import { ItemAPIs } from '../../../api/ItemAPIs';

interface props {
    itemList: ItemListDataType[];
    setItemList: React.Dispatch<React.SetStateAction<ItemListDataType[]>>;
}
export const ItemList = ({ itemList, setItemList }: props) => {
    const location = useLocation();
    const { getItemListJoinAdWhereItemNameAndItemNo } = ItemAPIs(); //AgroupAPI
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [checkBoxList, setCheckBoxList] = useState<React.Key[]>([]); //체크박스 리스트

    //초기 세팅 -> 유즈 이펙트
    useEffect(() => {
        if (itemList.length == 0) {
            getItemListJoinAdWhereItemNameAndItemNo({
                itemNo: '' as string,
                itemName: '' as string,
                advId: localStorage.getItem('ID') as string,
                agroupId: location.state.agroupId,
            })
                .then((res) => {
                    console.log('그룹리스트 조회 버튼 눌렀을 때');
                    console.log(res.data);
                    setItemList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    //테이블 체크박스
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ItemListDataType[]) => {
            setCheckBoxList(selectedRowKeys);
            console.log(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record: ItemListDataType) => ({
        //     disabled: record.itemName === 'Disabled User', // Column configuration not to be checked
        //     name: record.itemName,
        // }),
    };
    //ItemTable의 광고 사용 활성 여부 일괄 변경
    const itemListTableOnOffChangeAll = () => {
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            console.log('sdsd');
            alert('체크 박스를 먼저 골라주세요.');
            return null;
        }
        console.log('리턴 널 체크');
        //Api
    };

    //ItemTable의 광고 사용 활성 여부 변경
    const itemListTableOnOffChange = () => {};

    //테이블 컬럼
    const columns: ColumnsType<ItemListDataType> = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            render: (value, record, index) => <span>{index + 1}</span>,
        },
        {
            title: '상품번호',
            key: 'itemNo',
            dataIndex: 'itemNo',
            align: 'center',
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
                    value={itemList?.[index].adId}
                    onClick={itemListTableOnOffChange}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {itemList?.[index].adUseConfigYn === 1 ? 'ON' : 'OFF'}
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
                            value={'OK'}
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <span>광고 상품 삭제</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg white "
                            value={'CANCEL'}
                            // onClick={() => {
                            //     //이거 밖으로
                            //     if (checkBoxList.length == 0) {
                            //         alert('체크리스트를 선택해 주십시오');
                            //     } else {
                            //         deleteAgroupActYn({ idList: checkBoxList })
                            //             .then((res) => {
                            //                 console.log(res);
                            //             })
                            //             .catch((err) => {
                            //                 console.log(err);
                            //             });
                            //         alert('삭제 되었습니다.');
                            //         window.location.replace('/managead');
                            //     }
                            // }}
                        >
                            <span>광고 상품 다운로드</span>
                        </Button>

                        {/*<CSVLink*/}
                        {/*    data={csv}*/}
                        {/*    headers={headers}*/}
                        {/*    onClick={CsvOnClickHandle}*/}
                        {/*    filename={`Test`}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        type="primary"*/}
                        {/*        className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray "*/}
                        {/*        value={'CANCEL'}*/}
                        {/*        // onClick={CsvOnClickHandle}*/}
                        {/*    >*/}
                        {/*        <span>다운로드</span>*/}
                        {/*    </Button>*/}
                        {/*</CSVLink>*/}
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
