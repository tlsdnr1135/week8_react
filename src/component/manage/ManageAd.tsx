import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIs } from '../../api/ApiService';
import { AdGroupList, AdvMngType } from '../../DataType/ManageType';
import { Button, Input, Modal, Switch } from 'antd';
import { AdvInformation } from './managead/AdvInformation';
import { AgroupSearch } from './managead/AgroupSearch';
import { AgroupList } from './managead/agroupList';

export const ManageAd = () => {
    const navigate = useNavigate();
    const { getAdv, updateAdvAdIngActYn, updateAdvDayLimitBudget, getAdGroupList } = APIs(); //api
    const [agroupSearchInput, setAgroupSearchInput] = useState(''); //그룹 조회 인풋
    const [agroupList, setAgroupList] = useState<AdGroupList[]>(); //그룹 리스트

    //모달 변경 시 api
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 관리</h1>
                        </div>
                        <div className="content-body">
                            <AdvInformation />
                            <AgroupSearch
                                agroupSearchInput={agroupSearchInput}
                                setAgroupSearchInput={setAgroupSearchInput}
                                setAgroupList={setAgroupList}
                            />
                            <AgroupList agroupList={agroupList!} setAgroupList={setAgroupList} />
                        </div>
                    </div>
                </div>
            </main>
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
            {/******************************************************************************************************/}
        </>
    );
};
