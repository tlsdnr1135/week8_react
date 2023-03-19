import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { APIs } from '../../api/ApiService';
import { DataType } from '../../DataType/RedAdType';

interface ItemSelectParams {
    setLevels: React.Dispatch<React.SetStateAction<number>>;
    setDatas: React.Dispatch<React.SetStateAction<DataType[]>>;
}

export const ItemSearch = ({ setLevels, setDatas }: ItemSelectParams) => {
    const { getItemList } = APIs();

    const [itemNo, setItmeNo] = useState('');
    const [itemName, setItmeName] = useState('');

    //상품 조회 Input 핸들러
    const itemNameHandler = (e: any) => {
        setItmeName(e.target.value);
    };
    const itemNoHandler = (e: any) => {
        setItmeNo(e.target.value);
    };

    //조회 버튼(상품 조회)
    const selectButton = (e: any) => {
        const parameter = { itemNo: itemNo, itemName: itemName };

        getItemList(parameter)
            .then((response) => {
                const temp = response.data.items;
                temp.forEach((item: DataType) => {
                    item.key = item.id;
                    if (item.adultYn === 0) {
                        item.adultYn = 'NO';
                    } else {
                        item.adultYn = 'YES';
                    }
                    if (item.itemActYn === 0) {
                        item.itemActYn = '비활성화';
                    } else {
                        item.itemActYn = '활성화';
                    }
                });
                console.log('상품 조회 response = ', temp);
                setDatas(temp); //상품 조회 테이블
            })
            .catch((error) => {
                console.log(error);
            });
        setLevels(1); //상품 조회 결과 보여주기
    };
    return (
        <>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-left">
                        <div className="box-left">
                            <h2 className="fz-24 fc-gray-700">상품 조회</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">상품명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <Input
                                        name="itemName"
                                        placeholder="상품명을 입력하세요."
                                        className="ant-input css-dev-only-do-not-override-1me4733"
                                        type="text"
                                        // value={itemName}
                                        onChange={itemNameHandler}
                                        style={{ width: '500px' }}
                                    />
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-500">상품번호</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <Input
                                        name="itemNo"
                                        placeholder="상품번호을 입력하세요."
                                        className="ant-input css-dev-only-do-not-override-1me4733"
                                        type="text"
                                        onChange={itemNoHandler}
                                        style={{ width: '500px' }}
                                    />
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className="box-footer">
                    <div className="box-center">
                        <Button
                            type="primary"
                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                            value={1}
                            onClick={selectButton}
                        >
                            <span>조회</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
