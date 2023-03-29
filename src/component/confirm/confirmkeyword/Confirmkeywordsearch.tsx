import React from 'react';
import { Button, Input } from 'antd';

export const Confirmkeywordsearch = () => {
    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">검수 키워드 조회</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">키워드명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="키워드명을 입력해주세요."
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            // value={inputKwdName}
                                            // onChange={inputKwdNameHandle}
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-center">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink "
                            value={1}
                            // onClick={ketwordListSearchButton}
                        >
                            <span>키워드 조회</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
