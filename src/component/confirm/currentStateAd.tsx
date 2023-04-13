import React, { useState } from 'react';
import { taskReportListType } from '../../DataType/confirmType';
import { CurrentStateAdGraph } from './currentstatead/currentStateAdGraph';
import { CurrentStateAdList } from './currentstatead/currentStateAdList';
import { CurrentStateAdReportList } from './currentstatead/currentStateAdReportList';

export const CurrentStateAd = () => {
    const [itemName, seItemName] = useState<string>('');
    const [dadReportList, setDadReportList] = useState<taskReportListType[]>([]);

    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        {/*<div className="content-header">*/}
                        {/*    <h1 className="fz-32 fc-gray-900">광고 검수</h1>*/}
                        {/*</div>*/}
                        <div className="content-body">
                            <CurrentStateAdList
                                seItemName={seItemName}
                                setDadReportList={setDadReportList}
                            />
                            {dadReportList.length != 0 ? (
                                <CurrentStateAdGraph
                                    itemName={itemName}
                                    dadReportList={dadReportList}
                                />
                            ) : (
                                <div></div>
                            )}
                            {dadReportList.length != 0 ? (
                                <CurrentStateAdReportList dadReportList={dadReportList} />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
