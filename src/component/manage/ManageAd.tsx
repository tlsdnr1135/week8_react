import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIs } from '../../api/ApiService';
import { AdGroupList, AdvMngType } from '../../DataType/ManageType';
import { Button, Input, Modal, Switch } from 'antd';
import { AdvInformation } from './managead/AdvInformation';
import { AgroupSearch } from './managead/AgroupSearch';
import { AgroupList } from './managead/AgroupList';
import { AgroupAPIs } from '../../api/AgroupAPIs';

export const ManageAd = () => {
    const [agroupSearchInput, setAgroupSearchInput] = useState(''); //그룹 조회 인풋
    const [agroupList, setAgroupList] = useState<AdGroupList[]>([]); //그룹 리스트
    const [adv, setAdv] = useState<AdvMngType>(); //광고주 계정 설정 및 정보

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
                            <AdvInformation adv={adv!} setAdv={setAdv!} />
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
        </>
    );
};
