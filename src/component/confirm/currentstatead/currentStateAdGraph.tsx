import { DualAxes } from '@ant-design/plots';
import { Button, Select } from 'antd';
import React from 'react';

export const CurrentStateAdGraph = () => {
    const data = [
        {
            year: '1991',
            value: 3,
            count: 10,
        },
        {
            year: '1992',
            value: 4,
            count: 4,
        },
        {
            year: '1993',
            value: 3.5,
            count: 5,
        },
        {
            year: '1994',
            value: 5,
            count: 5,
        },
        {
            year: '1995',
            value: 4.9,
            count: 4.9,
        },
        {
            year: '1996',
            value: 6,
            count: 35,
        },
        {
            year: '1997',
            value: 7,
            count: 7,
        },
        {
            year: '1998',
            value: 9,
            count: 1,
        },
        {
            year: '1999',
            value: 13,
            count: 20,
        },
    ];

    //y축 커스텀

    //그래프
    const config = {
        data: [data, data],
        xField: 'year',
        yField: ['value', 'count'],
        meta: {
            value: { alias: '温度' },
            count: {
                alias: '海拔',
            },
        },

        geometryOptions: [
            {
                geometry: 'line',
                color: '#5B8FF9',
                tooltip: {
                    position: 'bottom',
                },
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
                position: 'bottom',
            },
        ],
    };
    return (
        <>
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">!!!나중에 상품명!!!</h2>
                    </div>
                    <div className="box-right">
                        <Button
                            type="primary"
                            className="gray"
                            size={'large'}
                            // onClick={() => setIsModalOpen(true)}
                        >
                            <span>검수 키워드 등록</span>
                        </Button>
                    </div>
                </div>

                <div className="box-body">
                    <Select
                        style={{ width: 100 }}
                        // onClick={onclickSelecter}
                        // onClick={handleChange}
                        // onChange={handleChange}
                        // defaultValue="광고그룹을 선택해주세요"
                        // value={selectGroups.value}
                        // options={agroups}
                    />
                    <DualAxes {...config} />
                    {/*<Table*/}
                    {/*    columns={columns}*/}
                    {/*    dataSource={keywordList}*/}
                    {/*    pagination={{*/}
                    {/*        total: keywordList?.length,*/}
                    {/*        showTotal: showTotal,*/}
                    {/*        size: 'default',*/}
                    {/*    }}*/}
                    {/*    bordered*/}
                    {/*/>*/}
                </div>
            </section>
        </>
    );
};
