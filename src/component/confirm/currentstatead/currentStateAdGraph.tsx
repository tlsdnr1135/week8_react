import DualAxesChart from '@ant-design/plots/es/components/dual-axes';
import { Select } from 'antd';
import React, { useState } from 'react';
import { taskReportListType } from '../../../DataType/confirmType';

interface props {
    dadReportList: taskReportListType[];
    itemName: string;
}

//셀렉터 라벨
const selector = [
    { value: 'showCount', label: '노출 수' },
    { value: 'clickCount', label: '클릭 수' },
    { value: 'avgShowRank', label: '평균 노출 순위' },
    { value: 'avgCpc', label: '평균 클릭 비용' },
    { value: 'adCost', label: '광고 비용' },
];
export const CurrentStateAdGraph = ({ dadReportList, itemName }: props) => {
    const [selectorOne, setSelectorOne] = useState<string>('showCount');
    const [selectorTwo, setSelectorTwo] = useState<string>('clickCount');

    //셀렉터 핸들
    const selectorOneHandleChange = (value: string) => {
        console.log('셀렉터 밸류 :', value);
        setSelectorOne(value);
    };
    const selectorTwoHandleChange = (value: string) => {
        console.log('셀렉터 밸류 :', value);
        setSelectorTwo(value);
    };
    //셀렉터 값이 바뀌면 그 셀렉터 값의 value의 행을 뽑아낸다!!!(배열로 미리 만들어 놓기?)

    //그래프
    //meta가 선에 나오는 것 -> 메타에 따라 legend 텍스트가 나옴
    //legend 아래에 있는 두칸짜리
    // const temp1 = [
    //     { showCount: 5, avgShowRank: 10, date: 12 },
    //     { showCount: 4, avgShowRank: 20, date: 13 },
    // ];
    // const temp2 = [
    //     { clickCount: 5, date: 12 },
    //     { clickCount: 1, date: 13 },
    // ];
    const config: any = {
        // data: [temp1, temp2],
        data: [dadReportList, dadReportList],
        xField: 'date',
        yField: [selectorOne, selectorTwo],
        meta: {
            showCount: {
                alias: '노출 수',
            },
            clickCount: {
                alias: '클릭 수',
            },
            avgShowRank: {
                alias: '평균 노출 순위',
            },
            avgCpc: {
                alias: '평균 클릭 비용',
            },
            adCost: {
                alias: '광고 비용',
            },
        },
        legend: {
            itemName: {
                formatter: (text: string, item: any) => {
                    switch (text) {
                        case '노출 수':
                            return (item.value = '노출 수');
                        case '클릭 수':
                            return (item.value = '클릭 수');
                        case '평균 노출 순위':
                            return (item.value = '평균 노출 순위');
                        case '평균 클릭 비용':
                            return (item.value = '평균 클릭 비용');
                        case '광고 비용':
                            return (item.value = '광고 비용');
                    }
                    console.log('그래프 안 레전드 : ', text);
                },
            },
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
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">{itemName}</h2>
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
