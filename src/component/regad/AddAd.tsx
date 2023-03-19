import React from 'react';
import { Button } from 'antd';
import { APIs } from '../../api/ApiService';

import { KeyWordType, PickButtonType } from '../../DataType/RedAdType';

interface AddAd {
    keywordTables: KeyWordType[];
    picks: PickButtonType;
    selectGroups: { label: string; value: string };
}

export const AddAd = ({ keywordTables, picks, selectGroups }: AddAd) => {
    const { setAd } = APIs();

    const regAdEvent = () => {
        if (selectGroups.value === '광고그룹을 선택해주세요') {
            alert('광고그룹을 선택해주세요');
            return null;
        }
        const parameter = {
            adv: {
                name: localStorage.getItem('ID') as string,
            },
            agroup: {
                agroupName: selectGroups.value as string,
            },
            item: {
                id: picks?.id as number,
            },
            kwd: keywordTables!,
        };
        console.log(parameter);
        setAd(parameter)
            .then((res) => {
                console.log(res);
                alert('광고등록 성공');
            })
            .catch((err) => {
                console.log(err);
                alert('광고등록 실패');
            });
    };
    return (
        <>
            <div className="box-footer">
                <div className="box-center">
                    <Button
                        type="primary"
                        className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg ant-btn-block pink"
                        onClick={regAdEvent}
                    >
                        <span>광고 등록</span>
                    </Button>
                </div>
            </div>
        </>
    );
};
