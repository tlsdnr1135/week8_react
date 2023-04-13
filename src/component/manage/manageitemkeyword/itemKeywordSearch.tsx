import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KeyWordAPIs } from '../../../api/keyWordAPIs';
import { KeywordListDataType } from '../../../DataType/manageType';

interface props {
    setKeywordList: React.Dispatch<React.SetStateAction<KeywordListDataType[]>>;
}
export const ItemKeywordSearch = ({ setKeywordList }: props) => {
    const location = useLocation();
    const { getkeywordListJoinDadDetFind } = KeyWordAPIs();
    const [inputKwdName, setInputKwdName] = useState('');

    const inputKwdNameHandle = (e: any) => {
        console.log(e.target.value);
        setInputKwdName(e.target.value);
    };
    const ketwordListSearchButton = () => {
        getkeywordListJoinDadDetFind({ adId: location.state.adId, kwdName: inputKwdName })
            .then((res) => {
                console.log(res);
                let index = 1;
                res.data.forEach((item: KeywordListDataType) => {
                    item.index = index;
                    index += 1;
                });
                setKeywordList(res.data);
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
                            <h2 className="fz-24 fc-gray-700">키워드 검색</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">키워드 검색</span>
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
                                            value={inputKwdName}
                                            onChange={inputKwdNameHandle}
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
                                            onClick={ketwordListSearchButton}
                                        >
                                            <span>키워드 조회</span>
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
