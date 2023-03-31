import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { confirmAdListType } from '../../../DataType/ConfirmType';
import { DadDetAPIs } from '../../../api/DadDetAPIs';
import { setIndex } from '../confirmkeyword/ConfirmKeywordSearch';

interface props {
    setConfirmAdList: React.Dispatch<React.SetStateAction<confirmAdListType[]>>;
}
export const ConfirmAdSearch = ({ setConfirmAdList }: props) => {
    const { getDadDetListsJoinAdkwdItem } = DadDetAPIs(); //API
    const [input, setInput] = useState(''); //인풋

    //키워드 조회 버튼
    const confirmAdListSearchButton = () => {
        getDadDetListsJoinAdkwdItem({ kwdName: input })
            .then((res) => {
                console.log(res);
                const data = setIndex(res.data);
                setConfirmAdList(data);
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
                            <h2 className="fz-24 fc-gray-700">검수 대상 키워드 조회</h2>
                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="tbl">
                        <dl>
                            <dt>
                                <div className="dt-inner">
                                    <span className="fz-15 fc-gray-800">키워드명</span>
                                </div>
                            </dt>
                            <dd>
                                <div className="form-group">
                                    <div className="box-left">
                                        <Input
                                            name="itemName"
                                            placeholder="키워드명을 입력해주세요."
                                            className="ant-input css-dev-only-do-not-override-1me4733"
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.currentTarget.value)}
                                            style={{ width: '500px' }}
                                        />
                                    </div>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </section>
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-center">
                        <Button
                            type="primary"
                            className="pink"
                            size={'large'}
                            onClick={confirmAdListSearchButton}
                        >
                            <span>키워드 조회</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
