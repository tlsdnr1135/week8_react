import React, { useState } from 'react';
import { AdGroupList, ItemListDataType } from '../../DataType/manageType';
import { AgroupInformation } from './manageagroup/agroupInformation';
import { ItemList } from './manageagroup/itemList';
import { ItemSearh } from './manageagroup/itemSearh';

export const ManageAgroup = () => {
    const [itemList, setItemList] = useState<ItemListDataType[]>([]);
    const [agroup, setAgroup] = useState<AdGroupList>();
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
                            <AgroupInformation agroup={agroup!} setAgroup={setAgroup!} />
                            <ItemSearh setItemList={setItemList} />
                            <ItemList
                                agroup={agroup!}
                                setAgroup={setAgroup!}
                                itemList={itemList!}
                                setItemList={setItemList}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
