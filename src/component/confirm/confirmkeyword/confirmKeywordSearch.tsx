import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { KeyWordAPIs } from '../../../api/keyWordAPIs';
import { keywordList } from '../../../DataType/confirmType';

interface props {
    setKeywordList: React.Dispatch<React.SetStateAction<keywordList[]>>;
}
export const setIndex = (res: any) => {
    let index = 1;
    res.forEach((item: any) => {
        item.index = index;
        index += 1;
    });
    return res;
};
export const ConfirmKeywordSearch = ({ setKeywordList }: props) => {
    const { getKeywordListManual } = KeyWordAPIs(); //API
    const [input, setInput] = useState(''); //인풋

    //키워드 조회 버튼
    const keywordSearchButton = () => {
        console.log();
        getKeywordListManual({ keywordName: input })
            .then((res) => {
                console.log(res);
                const data = setIndex(res.data);
                setKeywordList(data);
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
                            <h2 className="fz-24 fc-gray-700">검수 키워드 조회</h2>
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
                            onClick={keywordSearchButton}
                        >
                            <span>키워드 조회</span>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
