import React from 'react';

import { Button, Input, Table } from 'antd';

export const ManageAd = () => {
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 관리</h1>
                        </div>
                        <div className="content-body">
                            <section className="wrap-section wrap-datagrid">
                                <div className="box-header">
                                    <div className="box-left">
                                        <h2 className="fz-24 fc-gray-700">
                                            광고주 계정 설정 및 정보
                                        </h2>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <Table
                                        columns={columns}
                                        dataSource={datas}
                                        pagination={{
                                            total: datas?.length,
                                            showTotal: showTotals,
                                            size: 'default',
                                        }}
                                        bordered
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
