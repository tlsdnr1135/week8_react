import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Switch } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AgroupAPIs } from '../../../api/AgroupAPIs';
import moment from 'moment';
import { AdGroupList } from '../../../DataType/ManageType';

interface props {
    agroup: AdGroupList;
    setAgroup: React.Dispatch<React.SetStateAction<AdGroupList | undefined>>;
}
export const AgroupInformation = ({ agroup, setAgroup }: props) => {
    const location = useLocation();
    const { updateAgroupName, updateAgroupUseActYn, getAgroupDetails } = AgroupAPIs(); //AgroupAPI
    // const [agroupName, setAgroupname] = useState(location.state.agroupName);
    const [isModalOpen, setIsModalOpen] = useState(false); //광고그룹 이름 변경 모달
    const [input, setInput] = useState(''); //광고그룹 이름 변경 모달 인풋
    const [agroupUseActYn, setAgroupUseActYn] = useState<number>(); //스위치

    //초기 그룹관리 세팅
    useEffect(() => {
        console.log(location.state.agroupId);
        getAgroupDetails({ agroupId: location.state.agroupId })
            .then((res) => {
                console.log('초기화 데이터');
                console.log(res.data);
                setAgroup(res.data);
                setAgroupUseActYn(res.data?.agroupUseActYn as number);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //모달 인풋
    const InputModalChange = (e: any) => {
        console.log('InputModalChange', e.target.value);
        console.log('파악하려고', e);
        // if (e.target.value == 1) {
        //     Modal.('sdsdsd');
        // }
        setInput(e.target.value);
    };
    //등록 모달
    const modalHandle = (e: any) => {
        if (e.target.value === 'CANCEL') {
            console.log('취소됐엉');
            setInput('');
            setIsModalOpen(false);
        } else if (e.target.value === 'OK') {
            const emailRegEx = /^([0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝|-])/;
            if (!emailRegEx.test(input)) {
                Modal.warning({ content: '특수 문자나 공백은 사용할 수 없습니다.' });
                return;
            }
            console.log(agroup?.agroupName);
            updateAgroupName({ beforeAgroupName: agroup.agroupName!, afterAgroupName: input })
                .then((res) => {
                    console.log('현재 닉네임', agroup?.agroupName);
                    console.log('바꿀 닉네임', input);
                    console.log(res.data);
                    agroup!.agroupName = res.data as string;
                    setAgroup(agroup);
                    Modal.info({ content: '성공적으로 변했습니다' });
                    setIsModalOpen(false);
                })
                .catch((err) => {
                    console.log(err);
                    Modal.error({ content: '이미 존재하는 광고그룹명 입니다' });
                });
        }
    };
    //광고주 스위치
    const agroupUseActYnSwitch = (e: any) => {
        console.log(e);
        updateAgroupUseActYn({ agroupName: agroup!.agroupName! })
            .then((res) => {
                console.log('sdsdsdsdsddsds');
                console.log(res.data);
                setAgroupUseActYn(res.data);
                Modal.info({ content: '변경 완료 되었습니다.' });
            })
            .catch((err) => {
                console.log(err);
                Modal.error({ content: '오류가 낫습니당' });
            });
    };

    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">{agroup?.agroupName} 설정 및 정보</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner box-center">
                                    <span className="fz-15 fc-gray-500">그룹명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {agroup?.agroupName}
                                                </b>
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
                                <div className="dt-inner box-center">
                                    <span className="fz-15 fc-gray-500">그룹 ON/OFF</span>
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
                                                        onClick={agroupUseActYnSwitch}
                                                        checkedChildren="ON"
                                                        unCheckedChildren="OFF"
                                                        checked={
                                                            agroupUseActYn === 1 ? true : false
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
                                <div className="dt-inner box-center">
                                    <span className="fz-15 fc-gray-500">광고상품 수</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {agroup?.adActYn}개
                                                </b>
                                                <b className="fz-14 fc-gray-400">
                                                    <Button
                                                        type="primary"
                                                        className="pink"
                                                        size={'large'}
                                                        value={'OK'}
                                                        // href={'/regad'}
                                                        onClick={() => {
                                                            window.location.replace('/regad');
                                                        }}
                                                    >
                                                        <span>광고 상품 등록</span>
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
                                <div className="dt-inner box-center">
                                    <span className="fz-15 fc-gray-500">그룹 생성 시간</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <span className="comp-txt">
                                        <span className="table">
                                            <span className="table-cell">
                                                <b className="fz-14 fc-gray-400">
                                                    {moment(location.state.agroupRegTime).format(
                                                        'YYYY.MM.DD HH:mm'
                                                    )}
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
