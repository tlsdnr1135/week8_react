import { Button, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { AgroupSelecterType } from '../../DataType/redAdType';

interface AgroupSelecter {
    agroups: AgroupSelecterType[];
    setAgroups: React.Dispatch<React.SetStateAction<AgroupSelecterType[]>>;
    selectGroups: { label: string; value: string };
    setSelectGroups: React.Dispatch<React.SetStateAction<{ label: string; value: string }>>;
}
export const AgroupSelecter = ({
    agroups,
    setAgroups,
    selectGroups,
    setSelectGroups,
}: AgroupSelecter) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [input, setInput] = useState('');

    /* *******************************************************************/
    /* *******************************************************************/
    /* ***********************모달창***************************************/
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        //셀렉트 박스 추가
        const temp = {
            key: 1,
            value: input,
            label: input,
            regTime: input,
            agroupActYn: 1,
            agroupUseActYn: 1,
        };
        setAgroups([...agroups, temp]);
        setInput('');
        setSelectGroups({
            label: input,
            value: input,
        });
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setInput('');
        setIsModalOpen(false);
    };
    //모달 인풋
    const madalInput = (e: any) => {
        //광고 그룹 모달 클릭시
        //광고그룹 가져오기
        setInput(e.target.value);
        console.log(`selected `, e.target.value);
    };
    //Selecter
    const handleChange = (value: string) =>
        setSelectGroups({
            value: value,
            label: value,
        });
    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 그룹 선택</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                            onClick={showModal}
                        >
                            <span>신규 그룹 생성</span>
                        </Button>
                        ;
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">광고 그룹</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <Select
                                        style={{ width: 250 }}
                                        // onClick={onclickSelecter}
                                        // onClick={handleChange}
                                        onChange={handleChange}
                                        defaultValue="광고그룹을 선택해주세요"
                                        value={selectGroups.value}
                                        options={agroups}
                                    />
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
            {/* **************************************************************************************************************** */}
            <Modal
                className="ant-modal-content"
                title="신규 광고 그룹 생성"
                width={800}
                open={isModalOpen}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={[
                    <>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                            onClick={handleCancel}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                            onClick={handleOk}
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
                                            신규 광고그룹 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            name="groupName"
                                            value={input}
                                            onChange={madalInput}
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
