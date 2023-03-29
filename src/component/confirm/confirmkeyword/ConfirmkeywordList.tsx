import React from 'react';
import { Button, Table } from 'antd';

export const ConfirmkeywordList = () => {
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">검수 키워드 리스트</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray "
                            value={1}
                            // onClick={keywordListTableOnOffChangeAll}
                        >
                            <span>ON</span>
                        </Button>
                        <Button
                            type="primary"
                            className="white "
                            size={'large'}
                            value={0}
                            // onClick={keywordListTableOnOffChangeAll}
                        >
                            <span>OFF</span>
                        </Button>
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            value={0}
                            // onClick={deleteDaddetActYnButton}
                        >
                            <span>키워드 삭제</span>
                        </Button>
                        {/*<CSVLink*/}
                        {/*    data={csv}*/}
                        {/*    headers={headers}*/}
                        {/*    onClick={CsvOnClickHandle}*/}
                        {/*    filename={`Test`}*/}
                        {/*>*/}
                        {/*    <Button*/}
                        {/*        type="primary"*/}
                        {/*        className="white"*/}
                        {/*        size={'large'}*/}
                        {/*        value={'CANCEL'}*/}
                        {/*        // onClick={CsvOnClickHandle}*/}
                        {/*    >*/}
                        {/*        <span>광고 상품 다운로드</span>*/}
                        {/*    </Button>*/}
                        {/*</CSVLink>*/}
                    </div>
                </div>

                <div className="box-body">
                    {/*<Table*/}
                    {/*    rowSelection={{*/}
                    {/*        type: 'checkbox',*/}
                    {/*        ...rowSelection,*/}
                    {/*    }}*/}
                    {/*    columns={columns}*/}
                    {/*    dataSource={keywordList}*/}
                    {/*    pagination={{*/}
                    {/*        total: keywordList?.length,*/}
                    {/*        showTotal: showTotal,*/}
                    {/*        size: 'default',*/}
                    {/*    }}*/}
                    {/*    bordered*/}
                    {/*/>*/}
                </div>
            </section>
        </>
    );
};
