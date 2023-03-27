import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { Outlet } from 'react-router-dom';

interface props {
    title: string; //타이틀 제목
    width: number; //크기
    isModalOpen: boolean; //모달 변수
    modalHandle(e: any): void; //변경/취소 버튼
    input: string;
    InputModalChange(e: any): void;
    // inputsd: any;
}
export const CustomOneInputModal = ({
    title,
    width,
    isModalOpen,
    modalHandle,
    input,
    InputModalChange,
}: // inputsd,
props) => {
    return (
        <>
            <Modal
                className="ant-modal-content"
                title={title!}
                width={width}
                open={isModalOpen!}
                // onOk={handleOk}
                // onCancel={handleCancel}
                footer={[
                    <>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                            value={'CANCEL'}
                            onClick={modalHandle!}
                        >
                            <span>취소</span>
                        </Button>
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                            value={'OK'}
                            onClick={modalHandle!}
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
                                            onChange={InputModalChange!}
                                            style={{
                                                width: '300px',
                                            }}
                                        />
                                        원{/*<Outlet></Outlet>*/}
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
