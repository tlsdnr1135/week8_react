import { Button, Modal } from 'antd';
import React from 'react';
import { APIs } from '../../api/apiService';

import { KeyWordType, PickButtonType } from '../../DataType/redAdType';

interface AddAd {
    keywordTables: KeyWordType[];
    picks: PickButtonType;
    selectGroups: { label: string; value: string };
}

export const AddAd = ({ keywordTables, picks, selectGroups }: AddAd) => {
    const { setAd } = APIs();

    const regAdEvent = () => {
        console.log(picks.id);
        if (selectGroups.value === '광고그룹을 선택해주세요') {
            alert('광고그룹을 선택해주세요');
            return null;
        }
        if (keywordTables.length === 0) {
            Modal.warning({ content: '키워드를 추가해주세요..!' });
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
