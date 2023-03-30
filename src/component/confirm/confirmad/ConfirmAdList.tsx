import React from 'react';
import { Button, Input, Modal, Table } from 'antd';
import { CSVLink } from 'react-csv';

export const ConfirmAdList = () => {
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">광고 검수 대상 리스트</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <span>검수 키워드 등록</span>
                        </Button>

                        {/*<CSVLink*/}
                        {/*    type="primary"*/}
                        {/*    style={{ margin: '10px' }}*/}
                        {/*    // data={keywordList}*/}
                        {/*    // headers={headers}*/}
                        {/*    filename={`검수 키워드 리스트`}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        type="primary"*/}
                        {/*        className="white"*/}
                        {/*        size={'large'}*/}
                        {/*        value={'CANCEL'}*/}
                        {/*    >*/}
                        {/*        <span>키워드 다운로드</span>*/}
                        {/*    </Button>*/}
                        {/*</CSVLink>*/}
                    </div>
                </div>

                <div className="box-body">
                    <Table
                        // columns={columns}
                        // dataSource={keywordList}
                        // pagination={{
                        //     total: keywordList?.length,
                        //     showTotal: showTotal,
                        //     size: 'default',
                        // }}
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
                title="검수 대상 키워드 등록"
                width={800}
                // open={isModalOpen}
                // onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        type="primary"
                        className="gray"
                        size={'large'}
                        // onClick={() => modalHandle(false)}
                    >
                        <span>취소</span>
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        className="pink"
                        size={'large'}
                        // onClick={() => modalHandle(true)}
                    >
                        <span>등록</span>
                    </Button>,
                ]}
            >
                <section className="wrap-section wrap-tbl">
                    <div className="box-body">
                        <div className="tbl">
                            <dl>
                                <dt>
                                    <div className="dt-inner">
                                        <span className="fz-16 fw-med fc-7">
                                            키워드 명<i className="txt-essential"></i>
                                        </span>
                                    </div>
                                </dt>
                                <dd>
                                    <div className="form-group">
                                        <Input
                                            type="text"
                                            name="keywordName"
                                            placeholder="키워드 명을 입력하세요"
                                            // value={input}
                                            // onChange={(e) => setInput(e.currentTarget.value)}
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
