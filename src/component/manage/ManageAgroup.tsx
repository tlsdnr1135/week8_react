import React, { useEffect, useState } from 'react';
import { AgroupInformation } from './manageagroup/AgroupInformation';
import { ItemSearh } from './manageagroup/ItemSearh';
import { ItemList } from './manageagroup/ItemList';
import { AdGroupList, ItemListDataType } from '../../DataType/ManageType';

export const ManageAgroup = () => {
    const [itemList, setItemList] = useState<ItemListDataType[]>([]);
    // const [agroupList, setAgroupList] = useState<AdGroupList[]>([]); //그룹 리스트
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">그룹 관리</h1>
                        </div>
                        <div className="content-body">
                            <AgroupInformation />
                            <ItemSearh setItemList={setItemList} />
                            <ItemList itemList={itemList!} setItemList={setItemList} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
