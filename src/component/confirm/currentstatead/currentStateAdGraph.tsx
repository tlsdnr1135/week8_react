import DualAxesChart from '@ant-design/plots/es/components/dual-axes';
import { Select } from 'antd';
import React, { useState } from 'react';
import { taskReportListType } from '../../../DataType/ConfirmType';

interface props {
    dadReportList: taskReportListType[];
    setDadReportList: React.Dispatch<React.SetStateAction<taskReportListType[]>>;
}
//셀렉터 라벨
const selector = [
    { value: 'showCount', label: '노출 수' },
    { value: 'clickCount', label: '클릭 수' },
    { value: 'avgShowRank', label: '평균 노출 순위' },
    { value: 'avgCpc', label: '평균 클릭 비용' },
    { value: 'adCost', label: '광고 비용' },
];
export const CurrentStateAdGraph = ({ dadReportList, setDadReportList }: props) => {
    const [selectorOne, setSelectorOne] = useState('showCount');
    const [selectorTwo, setSelectorTwo] = useState('clickCount');

    //셀렉터 핸들
    const selectorOneHandleChange = (value: string) => {
        console.log('셀렉터 밸류 :', value);
        setSelectorOne(value);
    };
    const selectorTwoHandleChange = (value: string) => {
        console.log('셀렉터 밸류 :', value);
        setSelectorTwo(value);
    };

    //그래프
    const config: any = {
        data: [dadReportList, dadReportList],
        xField: 'date',
        yField: [selectorOne, selectorTwo],
        legend: {
            position: 'bottom',
        },
        geometryOptions: [
            {
                geometry: 'line',
                color: '#5B8FF9',
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
            },
        ],
    };
    console.log('config : ', config);
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">!!!나중에 상품명!!!</h2>
                    </div>
                    <div className="box-right">
                        <Select
                            style={{ width: 150 }}
                            onChange={selectorOneHandleChange}
                            value={selectorOne}
                            options={selector}
                        />
                        <Select
                            style={{ width: 150, margin: '10px' }}
                            onChange={selectorTwoHandleChange}
                            value={selectorTwo}
                            options={selector}
                        />
                    </div>
                </div>

                <div className="box-body">
                    <DualAxesChart {...config} />
                </div>
            </section>
        </>
    );
};
