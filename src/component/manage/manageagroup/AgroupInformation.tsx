import React, { useState } from 'react';
import { Button, Input, Modal, Switch } from 'antd';
import { useLocation } from 'react-router-dom';
import { AgroupAPIs } from '../../../api/AgroupAPIs';

export const AgroupInformation = () => {
    const location = useLocation();
    const { updateAgroupName } = AgroupAPIs();
    const [agroupName, setAgroupname] = useState(location.state.agroupName);
    const [isModalOpen, setIsModalOpen] = useState(false); //광고그룹 이름 변경 모달
    const [input, setInput] = useState(''); //광고그룹 이름 변경 모달 인풋

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
            console.log(agroupName);
            updateAgroupName({ beforeAgroupName: agroupName, afterAgroupName: input })
                .then((res) => {
                    console.log(res.data);
                    setAgroupname(res.data);
                    window.location.replace('/manageagroup');
                    alert('변경되었습니다.');
                })
                .catch((err) => {
                    console.log(err);
                    alert('이미 존재하는 아이디 입니다.');
                });
        }
    };

    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">신발그룹 설정 및 정보</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">그룹명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">{agroupName}</b>
                                                <b className="fz-14 fc-gray-400">
                                                    <Button
                                                        type="primary"
                                                        className="pink "
                                                        size={'large'}
                                                        value={1}
                                                        onClick={() => {
                                                            setIsModalOpen(true);
                                                        }}
                                                    >
                                                        <span>그룹명 변경</span>
                                                    </Button>
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
                                    <span className="fz-15 fc-gray-500">그룹 ON/OFF</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {/*{adv?.balanceDesc}원*/}
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
                                    <span className="fz-15 fc-gray-500">광고상품 수</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {/*{adv?.eventMoneyBalanceDesc}원*/}
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
                                    <span className="fz-15 fc-gray-500">그룹 생성 시간</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {/*{adv?.statusBalance}*/}
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
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            <Modal
                className="ant-modal-content"
                title="광고그룹명 변경"
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
                            <span>변경</span>
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
