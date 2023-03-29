import React, { useState } from 'react';
import { Headers } from '../../common/Headers';
import { Footers } from '../../common/Footers';
import { Outlet } from 'react-router-dom';
import { Button, Input, Modal, PaginationProps, Select, Table } from 'antd';
import { ItemSearch } from '../../component/regad/ItemSearch';
import { ItemTable } from '../../component/regad/ItemTable';
import { SelectDataTable } from '../../component/regad/SelectDataTable';
import { AgroupSelecter } from '../../component/regad/AgroupSelecter';
import { KeywordList } from '../../component/regad/KeywordList';

import { AddAd } from '../../component/regad/AddAd';
import {
    AgroupSelecterType,
    DataType,
    KeyWordType,
    PickButtonType,
} from '../../DataType/RedAdType';

export const EnhencedRegAd = () => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`; //페이지 네이션
    const [level, setLevel] = useState<number>(0); //레벨별 컴포넌트 보여주는 변수
    const [data, setData] = useState<DataType[]>([]); //조회시 나오는 상품 테이블
    const [pick, setPickButton] = useState<PickButtonType>(); //선택할 때 상품 정보 테이블
    const [agroup, setAgroup] = useState<AgroupSelecterType[]>([]); //광고 그룹 셀렉터
    const [selectGroup, setSelectGroup] = useState<{ label: string; value: string }>({
        label: '광고그룹을 선택해주세요',
        value: '광고그룹을 선택해주세요',
    });
    const [keywordTable, setKeywordTable] = useState<KeyWordType[]>([]);

    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 등록</h1>
                        </div>
                        <div className="content-body">
                            {level >= 0 && ( //상품 조회
                                <ItemSearch setLevels={setLevel} setDatas={setData} />
                            )}
                            {level >= 1 && ( //상품 조회 결과
                                <ItemTable
                                    setLevels={setLevel}
                                    datas={data}
                                    showTotals={showTotal}
                                    setAgroups={setAgroup}
                                    setPickButtons={setPickButton}
                                />
                            )}
                            {level >= 2 && ( //선택한 상품 정보
                                <SelectDataTable picks={pick!} />
                            )}
                            {level >= 2 && ( //광고그룹
                                <AgroupSelecter
                                    agroups={agroup}
                                    setAgroups={setAgroup}
                                    selectGroups={selectGroup}
                                    setSelectGroups={setSelectGroup}
                                />
                            )}
                            {level >= 2 && ( //키워드 리스트
                                <KeywordList
                                    keywordTables={keywordTable!}
                                    setKeywordTables={setKeywordTable}
                                />
                            )}
                            {level >= 2 && ( //광고 등록
                                <AddAd
                                    keywordTables={keywordTable!}
                                    picks={pick!}
                                    selectGroups={selectGroup}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
