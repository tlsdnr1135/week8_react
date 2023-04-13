import React, { useState } from 'react';
import { requestTaskListType } from '../../DataType/confirmType';
import { RequestTask } from './managebulk/requestTask';
import { RequestTaskInfo } from './managebulk/requestTaskInfo';

export const ManageBulk = () => {
    const [requestReportList, setRequestReportList] = useState<requestTaskListType[]>([]);
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">대량 관리</h1>
                        </div>
                        <div className="content-body">
                            <RequestTask setRequestReportList={setRequestReportList} />
                            <RequestTaskInfo
                                requestReportList={requestReportList}
                                setRequestReportList={setRequestReportList}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
