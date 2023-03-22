import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, PaginationProps, Table } from 'antd';
import { AdGroupList, AgroupListCsv } from '../../../DataType/ManageType';
import { ColumnsType } from 'antd/es/table';
import { CSVLink, CSVDownload } from 'react-csv';
import { APIs } from '../../../api/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import { AgroupAPIs } from '../../../api/AgroupAPIs';

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
        let CsvData: AgroupListCsv[];
        CsvData = agroupList.map((item) => ({
            key: 0,
            agroupName: item.agroupName,
            agroupUseActYn: item.agroupUseActYn,
            itemCount: item.adUseConfigYn + '/' + item.adActYn,
            // itemCount: 0,
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
        if (agroupList.length == 0) {
            getAdGroupList({
                name: localStorage.getItem('ID') as string,
                agroupName: '',
            })
                .then((res) => {
                    console.log('그룹리스트 조회 버튼 눌렀을 때');
                    console.log(res.data);
                    setAgroupList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    //테이블 컬럼
    const columns: ColumnsType<AdGroupList> = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key1',
            align: 'center',
            render: (value, record, index) => <span>{index + 1}</span>,
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
                        agroupName: agroupList?.[index].agroupName,
                        agroupUseActYn: agroupList?.[index].agroupUseActYn,
                        agroupRegTime: agroupList?.[index].regTime,
                        agroupId: agroupList?.[index].key,
                    }}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                >
                    {agroupList?.[index].agroupName}
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
                    value={agroupList?.[index].agroupName}
                    onClick={AgroupListTableOnOffChange}
                    style={{ color: 'dodgerblue', textDecoration: 'underline' }}
                >
                    {agroupList?.[index].agroupUseActYn === 1 ? 'ON' : 'OFF'}
                </button>
            ),
        },
        {
            title: '상품 수(LIVE/전체)',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <span>
                    {agroupList?.[index].adUseConfigYn}/{agroupList?.[index].adActYn}
                </span>
            ),
        },
    ];
    const AgroupListTableOnOffChange = (e: any) => {
        console.log('--------------------------------------------');
        console.log(e.target.value);
        console.log('--------------------------------------------');
        updateAgroupUseActYn({ name: e.target.value })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            });
        alert('그룹 사용이 변경되었습니다.');
        window.location.replace('/managead');
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
    const agroupOnOffButton = (e: any) => {
        //체크버튼이 하나도 안 눌러져있으면!
        if (checkBoxList.length == 0) {
            console.log('sdsd');
            alert('체크 박스를 먼저 골라주세요.');
            return null;
        }
        getAgroupOnOff({ idList: checkBoxList, yn: e.target.value })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
        //여기서 그룹리스트를 랜더링 시켜줘야함
        alert('변경되었습니다.');
        // navigate('/managead', { replace: true });
        window.location.replace('/managead');
    };
    /* ******************************************************************************************************* */
    /* ******************************************************************************************************* */
    /* ******************************************************************************************************* */
    //모달 인풋
    const InputModalChange = (e: any) => {
        console.log('InputModalChange', e.target.value);
        setInput(e.target.value);
    };
    //등록 모달
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
                alert('빈칸입니다');
            } else if (!temp) {
                alert('이미 중복된 값 입니다.');
            } else {
                //api
                saveAgroup({ agroupName: input })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                alert('변경되었습니다.');
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
                            onClick={() => {
                                //이거 밖으로
                                if (checkBoxList.length == 0) {
                                    alert('체크리스트를 선택해 주십시오');
                                } else {
                                    deleteAgroupActYn({ idList: checkBoxList })
                                        .then((res) => {
                                            console.log(res);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                    alert('삭제 되었습니다.');
                                    window.location.replace('/managead');
                                }
                            }}
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
