import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { ItemListDataType } from '../../../DataType/ManageType';
import { ItemAPIs } from '../../../api/ItemAPIs';
import { useLocation } from 'react-router-dom';
interface props {
    setItemList: React.Dispatch<React.SetStateAction<ItemListDataType[]>>;
}

export const ItemSearh = ({ setItemList }: props) => {
    const location = useLocation();
    const { getItemListJoinAdWhereItemNameAndItemNo } = ItemAPIs();
    const [itemNameInput, setItemNameInput] = useState('');
    const [itemNoInput, setItemNoInput] = useState('');

    //itemSearch 인풋
    const itemNameInputHandle = (e: any) => {
        setItemNameInput(e.target.value);
    };
    const itemNoInputHandle = (e: any) => {
        setItemNoInput(e.target.value);
    };
    const itemListSearchButton = () => {
        console.log('itemListSearchButton');
        getItemListJoinAdWhereItemNameAndItemNo({
            itemName: itemNameInput,
            itemNo: itemNoInput,
            advId: localStorage.getItem('ID') as string,
            agroupId: location.state.agroupId,
        })
            .then((res) => {
                console.log(res.data);
                setItemList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">상품 검색</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">상품 명 검색</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="상품명을 입력해주세요."
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            value={itemNameInput}
                                            onChange={itemNameInputHandle}
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                </div>
                            </dd>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">상품 번호 검색</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="상품 번호를 입력해주세요."
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            value={itemNoInput}
                                            onChange={itemNoInputHandle}
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                </div>
                            </dd>
                            <div className="box-right">
                                <dd>
                                    <div className="box-right">
                                        <Button
                                            type="primary"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink "
                                            value={1}
                                            onClick={itemListSearchButton}
                                        >
                                            <span>그룹 조회</span>
                                        </Button>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </>
    );
};
