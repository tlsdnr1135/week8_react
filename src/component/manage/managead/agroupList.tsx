import { Button, Input, Modal, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { AgroupAPIs } from '../../../api/agroupAPIs';
import { AdGroupList, AgroupListCsv } from '../../../DataType/manageType';

interface props {
    agroupList: AdGroupList[];
    setAgroupList: React.Dispatch<React.SetStateAction<AdGroupList[]>>;
}
export const AgroupList = ({ agroupList, setAgroupList }: props) => {
    const navigate = useNavigate();
    const { getAdGroupList, getAgroupOnOff, saveAgroup, deleteAgroupActYn, updateAgroupUseActYn } =
        AgroupAPIs(); //api
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [checkBoxList, setCheckBoxList] = useState<React.Key[]>([]); //체크박스 리스트
    const [isModalOpen, setIsModalOpen] = useState(false); //광고그룹 등록 모달
    const [input, setInput] = useState(''); //광고그룹 모달 인풋
    const [csv, setCsv] = useState<AgroupListCsv[]>([]); //csv Data

    //csv
    const headers = [
        { label: '번호', key: 'key' },
        { label: '그룹명', key: 'agroupName' },
        { label: '그룹 ON/OFF', key: 'agroupUseActYn' },
        { label: '상품 수', key: 'itemCount' },
    ];

    //csvDataHandle
    const CsvOnClickHandle = () => {
        // let CsvData: AgroupListCsv[];
        const CsvData: AgroupListCsv[] = agroupList.map((item) => ({
            key: 0,
            agroupName: item.agroupName,
            agroupUseActYn: item.agroupUseActYn,
            itemCount: item.adUseConfigYn + '/' + item.adActYn,
        }));
        let index = 1;
        CsvData.forEach((item) => {
            item.key = index;
            item.agroupUseActYn = item.agroupUseActYn === 1 ? 'ON' : 'OFF';
            index += 1;
        });
        setCsv(CsvData);
    };

    //초기 세팅
    useEffect(() => {
        getAdGroupList({
            name: localStorage.getItem('ID') as string,
            agroupName: '',
        })
            .then((res) => {
                console.log(res.data);
                let index = 1;
                res.data.forEach((item: AdGroupList) => {
                    item.index = index;
                    index += 1;
                });
                setAgroupList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //테이블 컬럼
    const columns: ColumnsType<AdGroupList> = [
        {
            title: '번호',
            dataIndex: 'index',
            // key: 'key1',
            align: 'center',
            render: (value, record, index) => <span>{record.index}</span>,
        },
        {
            title: '그룹명',
            key: 'agroupName',
            dataIndex: 'agroupName',
            align: 'center',
            render: (value, record, index) => (
                <Link
                    to={'/manageagroup'}
                    state={{
                        agroupId: record.key, //이걸 가지고 가서 다시 불러옴
                    }}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    {record.agroupName}
                </Link>
            ),
        },
        {
            title: '그룹 ON/OFF',
            key: 'agroupUseActYn',
            dataIndex: 'agroupUseActYn',
            align: 'center',
            render: (value, record, index) => (
                <button
                    value={record.agroupName}
                    onClick={AgroupListTableOnOffChange}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {record.agroupUseActYn === 1 ? 'ON' : 'OFF'}
                </button>
            ),
        },
        {
            title: '상품 수(LIVE/전체)',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <span>
                    {record.adUseConfigYn}/{record.adActYn}
                </span>
            ),
        },
    ];

    //단일  ON/OFF a태그
    const AgroupListTableOnOffChange: React.MouseEventHandler<HTMLButtonElement> = (e: any) => {
        console.log(e);
        console.log('--------------------------------------------');
        console.log(e.currentTarget.value);
        console.log('--------------------------------------------');
        updateAgroupUseActYn({ agroupName: e.target.value })
            .then((res) => {
                const temp = agroupList;
                temp.forEach((item) => {
                    if (item.agroupName === e.target.value) {
                        item.agroupUseActYn = res.data;
                    }
                });
                setAgroupList([...temp!]);
                Modal.info({
                    content: '그룹 사용 여부가 변경되었습니다.',
                });
            })
            .catch((res) => {
                console.log('dpfjxk에러타냐');
                console.log(res);
            });
    };

    //테이블 체크박스
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: AdGroupList[]) => {
            setCheckBoxList(selectedRowKeys);
            console.log(selectedRowKeys);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    //그룹 ON/OFF 일괄설정
    // const agroupOnOffButton = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    const agroupOnOffButton = (e: any) => {
        console.log(e.value);
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            Modal.warning({
                content: '체크박스를 먼저 선택해 주십시오',
            });
            return null;
        }
        getAgroupOnOff({ idList: checkBoxList, yn: parseInt(e.target.value) })
            .then((res) => {
                console.log(res);
                //2중 포문
                const temp = agroupList!;
                temp.forEach((item) => {
                    checkBoxList.forEach((arr) => {
                        if (item.key === arr) {
                            console.log('item.agroupUseActYn', item.agroupUseActYn);
                            console.log('e.target.value', e.target.value);
                            item.agroupUseActYn = parseInt(e.target.value);
                            console.log('일리와');
                        }
                    });
                });
                console.log(temp[0]);
                setAgroupList([...temp!]);
                Modal.info({
                    content: '성공!',
                });
            })
            .catch((err) => {
                console.log(err);
                Modal.error({
                    content: '시일이일패!',
                });
            });
    };
    //그룹 삭제 Btn
    const agroupDeleteBtn = (e: any) => {
        if (checkBoxList.length == 0) {
            Modal.warning({
                content: '체크리스트를 선택해 주십시오!',
            });
        } else {
            deleteAgroupActYn({ idList: checkBoxList })
                .then((res) => {
                    console.log(res);
                    let temp = agroupList!;
                    //똑같은 값 찾아서 프론트단에서 업데이트
                    temp.forEach((item) => {
                        checkBoxList.forEach((arr) => {
                            if (item.key === arr) {
                                item.agroupActYn = 0;
                            }
                        });
                    });
                    temp = temp.filter((element) => element.agroupActYn === 1);
                    //인덱스로 하기
                    let index = 1;
                    temp.forEach((item) => {
                        item.index = index;
                        index += 1;
                    });
                    setAgroupList([...temp!]);
                    Modal.info({
                        content: '삭제되었습니다!',
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    /* ******************************************************************************************************* */
    /* ******************************************************************************************************* */
    /* ******************************************************************************************************* */
    //모달 인풋
    const InputModalChange = (e: any) => {
        console.log('InputModalChange', e.target.value);
        setInput(e.target.value);
    };
    //등록 모달(그룹명 변경)
    const modalHandle = (e: any) => {
        let temp = true;
        if (e.target.value === 'CANCEL') {
            console.log('취소됐엉');
            setInput('');
            setIsModalOpen(false);
        } else if (e.target.value === 'OK') {
            //이미 등록되어있는 광고를 입력한 경우
            agroupList.forEach((item) => {
                if (item.agroupName == input) {
                    temp = false;
                }
            });
            if (input.length == 0) {
                Modal.warning({
                    content: '빈칸입니다!',
                });
            } else if (!temp) {
                Modal.warning({
                    content: '이미 중복된 값 입니다!',
                });
            } else {
                //api
                saveAgroup({ agroupName: input })
                    .then((res) => {
                        console.log(res.data);
                        setInput('');
                        Modal.info({
                            content: '변경되었습니다',
                        });

                        // let temp = {
                        //     adActYn: 0,
                        //     adUseConfigYn: 0,
                        //     ag,
                        // };
                        // setAgroupList;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                window.location.replace('/managead');
                setInput('');
                setIsModalOpen(false);
            }
        }
    };

    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">그룹 리스트</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray "
                            value={1}
                            onClick={agroupOnOffButton}
                        >
                            <span>ON</span>
                        </Button>
                        <Button
                            type="primary"
                            className="white "
                            size={'large'}
                            value={0}
                            onClick={agroupOnOffButton}
                        >
                            <span>OFF</span>
                        </Button>
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            value={'OK'}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span>그룹추가</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg white "
                            value={'CANCEL'}
                            onClick={agroupDeleteBtn}
                        >
                            <span>그룹삭제</span>
                        </Button>

                        <CSVLink
                            data={csv}
                            headers={headers}
                            onClick={CsvOnClickHandle}
                            filename={`Test`}
                        >
                            <Button
                                type="primary"
                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray "
                                value={'CANCEL'}
                                // onClick={CsvOnClickHandle}
                            >
                                <span>다운로드</span>
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
                        dataSource={agroupList}
                        pagination={{
                            total: agroupList?.length,
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
                title="광고그룹 등록"
                width={800}
                open={isModalOpen}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={[
                    <>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                            value={'CANCEL'}
                            onClick={modalHandle}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                            value={'OK'}
                            onClick={modalHandle}
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
                                            광고그룹 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            name="groupName"
                                            value={input}
                                            onChange={InputModalChange}
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
