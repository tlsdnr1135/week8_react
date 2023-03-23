import React, { useEffect, useState } from 'react';
import { Button, PaginationProps, Table } from 'antd';
import { CSVLink } from 'react-csv';
import { ItemListDataType, KeywordListDataType } from '../../../DataType/ManageType';
import { ColumnsType } from 'antd/es/table';
import { Link, useLocation } from 'react-router-dom';
import { KeyWordAPIs } from '../../../api/KeyWordAPIs';

interface props {
    keywordList: KeywordListDataType[];
    setKeywordList: React.Dispatch<React.SetStateAction<KeywordListDataType[]>>;
}
export const ItemKeywordList = ({ keywordList, setKeywordList }: props) => {
    const location = useLocation();
    const { getkeywordListJoinDadDetFind, updateDadUseConfigYnOnOffAll } = KeyWordAPIs();
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [checkBoxList, setCheckBoxList] = useState<number[]>([]); //체크박스 리스트

    //초기값 세팅
    useEffect(() => {
        if (keywordList.length === 0) {
            getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: '' })
                .then((res) => {
                    console.log(res);
                    setKeywordList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    //keywordTable의 On/Off 버튼
    const keywordListTableOnOffChangeAll = (e: any) => {
        console.log(e.target.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            alert('체크 박스를 먼저 골라주세요.');
            return null;
        }
        console.log('리턴 널 체크');
        //Api
        updateDadUseConfigYnOnOffAll({ idList: checkBoxList, yn: e.target.value })
            .then((res) => {
                console.log(res);
                alert('키워드 상태가 변경되었습니다.');
                window.location.replace('/manageagroup');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //테이블 체크박스
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: KeywordListDataType[]) => {
            let temp: number[] = [];
            selectedRows.forEach((item) => {
                temp.push(item.dadDetId as number);
                console.log(item.dadDetId);
            });
            setCheckBoxList(temp);
            console.log(checkBoxList);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    //테이블 컬럼
    const columns: ColumnsType<KeywordListDataType> = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
            render: (value, record, index) => <span>{index + 1}</span>,
        },
        {
            title: '키워드 명',
            key: 'kwdName',
            dataIndex: 'kwdName',
            align: 'center',
        },
        {
            title: 'ON/OFF',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <button
                    value={index}
                    // onClick={itemListTableOnOffChange}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {keywordList?.[index].dadUseConfigYn === 1 ? 'ON' : 'OFF'}
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
                            onClick={keywordListTableOnOffChangeAll}
                        >
                            <span>ON</span>
                        </Button>
                        <Button
                            type="primary"
                            className="white "
                            size={'large'}
                            value={0}
                            onClick={keywordListTableOnOffChangeAll}
                        >
                            <span>OFF</span>
                        </Button>
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            value={0}
                            // onClick={deleteAdUseConfigYn}
                        >
                            <span>키워드 삭제</span>
                        </Button>

                        <Button
                            type="primary"
                            className="white"
                            size={'large'}
                            value={'CANCEL'}
                            // onClick={CsvOnClickHandle}
                        >
                            {/*<CSVLink*/}
                            {/*    data={csv}*/}
                            {/*    headers={headers}*/}
                            {/*    // onClick={CsvOnClickHandle}*/}
                            {/*    filename={`Test`}*/}
                            {/*>*/}
                            {/*    <span>광고 상품 다운로드</span>*/}
                            {/*</CSVLink>*/}
                        </Button>
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
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
        </>
    );
};
