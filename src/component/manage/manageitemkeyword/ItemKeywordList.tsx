import React, { useEffect, useState } from 'react';
import { Button, Modal, PaginationProps, Table } from 'antd';
import { CSVLink } from 'react-csv';
import {
    AgroupListCsv,
    ItemListDataType,
    KeywordListCsv,
    KeywordListDataType,
} from '../../../DataType/ManageType';
import { ColumnsType } from 'antd/es/table';
import { Link, useLocation } from 'react-router-dom';
import { KeyWordAPIs } from '../../../api/KeyWordAPIs';

interface props {
    keywordList: KeywordListDataType[];
    setKeywordList: React.Dispatch<React.SetStateAction<KeywordListDataType[]>>;
}
export const ItemKeywordList = ({ keywordList, setKeywordList }: props) => {
    const location = useLocation();
    const {
        getkeywordListJoinDadDetFind,
        updateDadUseConfigYnOnOffAll,
        updateDaddetActYnDeleteButton,
    } = KeyWordAPIs(); //API
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [checkBoxList, setCheckBoxList] = useState<number[]>([]); //체크박스 리스트
    const [csv, setCsv] = useState<KeywordListCsv[]>([]); //csv Data

    //초기값 세팅
    useEffect(() => {
        console.log('짱구짱구짱구짱구짱구짱구짱구짱구짱구짱구짱구짱구짱구');
        console.log(location.state.adId);
        getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: '' })
            .then((res) => {
                console.log(res);
                let index = 1;
                res.data.forEach((item: KeywordListDataType) => {
                    item.index = index;
                    index += 1;
                });
                setKeywordList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //csv
    const headers = [
        { label: '번호', key: 'key' },
        { label: '키워드', key: 'kwdName' },
        { label: 'ON/OFF', key: 'dadUseConfigYn' },
    ];
    //csvDataHandle
    const CsvOnClickHandle = () => {
        let CsvData: KeywordListCsv[];
        CsvData = keywordList.map((item) => ({
            key: 0,
            kwdName: item.kwdName,
            dadUseConfigYn: item.dadUseConfigYn,
        }));
        let index = 1;
        CsvData.forEach((item) => {
            item.key = index;
            item.dadUseConfigYn = item.dadUseConfigYn === 1 ? 'ON' : 'OFF';
            index += 1;
        });
        setCsv(CsvData);
    };

    //keywordTable의 On/Off 버튼
    const keywordListTableOnOffChangeAll = (e: any) => {
        console.log(e.target.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            Modal.warning({ content: '체크 박스를 먼저 골라주세요.' });
            return null;
        }
        console.log('리턴 널 체크');
        //Api
        console.log('체크박스', checkBoxList);
        updateDadUseConfigYnOnOffAll({ idList: checkBoxList, yn: e.target.value })
            .then((res) => {
                console.log(res);
                getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: '' })
                    .then((res) => {
                        console.log(res);
                        let index = 1;
                        res.data.forEach((item: KeywordListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setKeywordList(res.data);
                        Modal.info({ content: '키워드 상태가 변경되었습니다.' });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //keywordTable의 delete 버튼
    const deleteDaddetActYnButton = (e: any) => {
        console.log(e.target.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            Modal.warning({ content: '체크 박스를 먼저 골라주세요.' });
            return null;
        }
        console.log('리턴 널 체크');
        console.log(checkBoxList);

        //Api
        updateDaddetActYnDeleteButton({ idList: checkBoxList })
            .then((res) => {
                console.log(res);
                getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: '' })
                    .then((res) => {
                        console.log(res);
                        let index = 1;
                        res.data.forEach((item: KeywordListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setKeywordList(res.data);
                        Modal.warning({ content: '키워드가 삭제되었습니다' });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //keywordTable의 OnOff 단일 변경
    const updateOnOffOne = (e: any) => {
        console.log(e.target.value); //index
        let temp: number[] = [];
        temp.push(keywordList[e.target.value].dadDetId);

        let yn = keywordList[e.target.value].dadUseConfigYn as number;
        if (yn === 1) {
            yn = 0;
        } else {
            yn = 1;
        }

        updateDadUseConfigYnOnOffAll({
            idList: temp,
            yn: yn,
        })
            .then((res) => {
                console.log(res);
                getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: '' })
                    .then((res) => {
                        console.log(res);
                        let index = 1;
                        res.data.forEach((item: KeywordListDataType) => {
                            item.index = index;
                            index += 1;
                        });
                        setKeywordList(res.data);
                        Modal.info({ content: '변경이 완료되었습니다.' });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
            render: (value, record, index) => <span>{record.index}</span>,
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
                    key={value}
                    onClick={updateOnOffOne}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {record.dadUseConfigYn === 1 ? 'ON' : 'OFF'}
                </button>
            ),
        },
    ];
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">키워드 리스트</h2>
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
                            onClick={deleteDaddetActYnButton}
                        >
                            <span>키워드 삭제</span>
                        </Button>
                        <CSVLink
                            data={csv}
                            headers={headers}
                            onClick={CsvOnClickHandle}
                            filename={`Test`}
                        >
                            <Button
                                type="primary"
                                className="white"
                                size={'large'}
                                value={'CANCEL'}
                                // onClick={CsvOnClickHandle}
                            >
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
