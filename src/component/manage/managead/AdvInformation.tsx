import React, { useEffect, useState } from 'react';
import { APIs } from '../../../api/ApiService';
import { Button, Input, Modal, Switch } from 'antd';
import { AdvMngType } from '../../../DataType/ManageType';

export const AdvInformation = () => {
    const { getAdv, updateAdvAdIngActYn, updateAdvDayLimitBudget } = APIs(); //api
    const [adv, setAdv] = useState<AdvMngType>(); //광고주 계정 설정 및 정보
    const [isModalOpen, setIsModalOpen] = useState(false); //광고주 모달
    const [input, setInput] = useState('0'); //광고주 모달 인풋

    useEffect(() => {
        //초기 API세팅
        if (adv === undefined) {
            getAdv({ name: localStorage.getItem('ID') as string })
                .then((res) => {
                    console.log(res);
                    const temp: AdvMngType | undefined = {
                        advId: localStorage.getItem('ID') as string,
                        adIngActYn: res.data.adIngActYn,
                        balance: res.data.balance,
                        eventMoneyBalance: res.data.eventMoneyBalance,
                        dayLimitBudget: res.data.dayLimitBudget,
                        statusBalance: '',
                        statusDayLimitBudget: '',
                        balanceDesc: '',
                        eventMoneyBalanceDesc: '',
                    };
                    procAdvMngType(temp);
                    setAdv(temp);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    //Adv Desc 가공
    const procAdvMngType = (item: AdvMngType) => {
        //잔액 상태
        if (item.balance + item.eventMoneyBalance > 0) {
            item.statusBalance = '정상';
        } else {
            item.statusBalance = '잔액 없음';
        }
        //일일 허용 예산
        if (item.dayLimitBudget === 0) {
            item.statusDayLimitBudget = '무제한      ';
        } else {
            item.statusDayLimitBudget = item.dayLimitBudget;
        }
        //잔액 단위 붙여주기
        item.balanceDesc = item.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        item.eventMoneyBalanceDesc = item.eventMoneyBalance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    //광고주 스위치
    const advSwitch = (e: any) => {
        console.log(e);
        let adIngActYn;
        if (e) {
            adIngActYn = 1;
        } else {
            adIngActYn = 0;
        }
        updateAdvAdIngActYn({ name: localStorage.getItem('ID') as string, adIngActYn: adIngActYn })
            .then((res) => {
                const temp = adv;
                temp!.adIngActYn = res.data.adIngActYn;
                console.log(temp);
                setAdv({ ...temp! });
            })
            .catch((err) => {
                console.log(err);
            });
        alert('변경 완료 되었습니다.');
        // navigate('/manage');
    };
    //모달
    const modalHandle = (e: any) => {
        console.log('modalHandle', e.target.value);
        let cost = parseInt(input);
        if (e.target.value === 'CANCEL') {
            setInput('');
        } else {
            //100원 단위가 아닐경우
            if (cost % 100 != 0) {
                alert('100원 단위로 입력해주세요');
                return null;
            }
            setInput('');
            const temp = adv;
            temp!.dayLimitBudget = cost;
            procAdvMngType(temp!);
            console.log(temp);
            setAdv({ ...temp! });
            //API추가
            updateAdvDayLimitBudget({
                name: localStorage.getItem('ID') as string,
                dayLimitBudget: cost,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setIsModalOpen(false);
    };
    //모달 인풋
    const InputModalChange = (e: any) => {
        console.log('InputModalChange', e.target.value);
        setInput(e.target.value);
    };

    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">광고주 계정 설정 및 정보</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">광고 설정</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    <Switch
                                                        style={{
                                                            color: 'blue',
                                                            width: '100',
                                                        }}
                                                        onClick={advSwitch}
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                        checked={
                                                            adv?.adIngActYn === 1 ? true : false
                                                        }
                                                        size={'small'}
                                                    />
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
                                    <span className="fz-15 fc-gray-500">충전금 잔액</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {adv?.balanceDesc}원
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
                                    <span className="fz-15 fc-gray-500">이벤트 머니 잔액</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {adv?.eventMoneyBalanceDesc}원
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
                                    <span className="fz-15 fc-gray-500">잔액 상태</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {adv?.statusBalance}
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
                                    <span className="fz-15 fc-gray-500">일일 허용 예산</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {adv?.statusDayLimitBudget}
                                                    <Button
                                                        type="primary"
                                                        size={'middle'}
                                                        className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink "
                                                        onClick={() => setIsModalOpen(true)}
                                                    >
                                                        <span>일일 허용 예산 설정</span>
                                                    </Button>
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
                title="일일 허용 예산 설정"
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
                                            일일 허용 예산<i className="txt-essential"></i>
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
                                        원
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
