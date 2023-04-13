import { Button, Input } from 'antd';
import React from 'react';
import { AgroupAPIs } from '../../../api/agroupAPIs';
import { AdGroupList } from '../../../DataType/manageType';

interface props {
    agroupSearchInput: string;
    setAgroupSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setAgroupList: React.Dispatch<React.SetStateAction<AdGroupList[]>>;
}
export const AgroupSearch = ({ agroupSearchInput, setAgroupSearchInput, setAgroupList }: props) => {
    const { getAdGroupList } = AgroupAPIs(); //api
    //agroup 모달 인풋
    const agroupSearchInputHandle = (e: any) => {
        setAgroupSearchInput(e.target.value);
    };
    //조회 버튼
    const agroupListSearchButton = () => {
        getAdGroupList({
            name: localStorage.getItem('ID') as string,
            agroupName: agroupSearchInput,
        })
            .then((res) => {
                console.log(res.data);
                let index = 1;
                res.data.forEach((item: AdGroupList) => {
                    item.index = index;
                    index += 1;
                });
                setAgroupList(res.data);
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
                            <h2 className="fz-24 fc-gray-700">그룹 검색</h2>
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
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="상품명을 입력하세요."
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            value={agroupSearchInput}
                                            onChange={agroupSearchInputHandle}
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
                                            onClick={agroupListSearchButton}
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
