import React from 'react';
import { Button, message, PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AgroupSelecterType, DataType, PickButtonType } from '../../DataType/RedAdType';
import { AgroupAPIs } from '../../api/AgroupAPIs';

interface ItemSelectParams {
    setLevels: React.Dispatch<React.SetStateAction<number>>;
    datas: DataType[];
    showTotals: PaginationProps['showTotal'];
    setAgroups: React.Dispatch<React.SetStateAction<AgroupSelecterType[]>>;
    setPickButtons: React.Dispatch<React.SetStateAction<PickButtonType | undefined>>;
}
export const ItemTable = ({
    setLevels,
    datas,
    showTotals,
    setAgroups,
    setPickButtons,
}: ItemSelectParams) => {
    const [messageApi, contextHolder] = message.useMessage(); //Validation 메시지
    const { getAgroupSelectBoxList } = AgroupAPIs();

    const pickButton = (e: any) => {
        //비활성화 메시지를 위한 index찾기 작업
        console.log(e.target.value); //id값
        let index = datas?.findIndex((item) => item.id == e.target.value);
        console.log('인덱스 값', index); //id값으로 찾은 index값

        if ((datas?.[index as number].itemActYn as string) === '비활성화') {
            messageApi.info('비활성화다');
            if ((datas?.[index as number].itemActYn as string) === '비활성화') {
                setLevels(1);
            }
            return null;
        }

        //선택 시 광고그룹 셀렉터BOX 불러오기
        getAgroupSelectBoxList()
            .then((response) => {
                console.log(response.data.agroupFindResDtos);
                const group = response.data.agroupFindResDtos.map((item: any) => ({
                    key: item.id,
                    value: item.agroupName,
                    label: item.agroupName,
                    regTime: item.regTime,
                    agroupActYn: item.agroupActYn,
                    agroupUseActYn: item.agroupUseActYn,
                }));
                setAgroups(group);
            })
            .catch((error) => {
                console.log(error);
            });

        //누를 때 마다 선택한 상품 정보 바뀌어야 함. -> 선택시 나오는 단일 표
        const temp = {
            id: datas?.[index as number].id as number,
            itemNo: datas?.[index as number].itemNo as string,
            itemName: datas?.[index as number].itemName as string,
            adultYn: datas?.[index as number].adultYn as number,
        };
        setPickButtons(temp);

        setLevels(2);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: '상품번호',
            dataIndex: 'itemNo',
            key: 'itemNo',
            align: 'center',
        },
        {
            title: '상품명',
            dataIndex: 'itemName',
            key: 'itemName',
            align: 'center',
        },
        {
            title: '성인 상품 여부',
            dataIndex: 'adultYn',
            key: 'adultYn',
            align: 'center',
        },
        {
            title: '상품 가격',
            key: 'itemOrgCost',
            dataIndex: 'itemOrgCost',
            align: 'center',
        },
        {
            title: '상품 활성화 여부',
            key: 'itemActYn',
            dataIndex: 'itemActYn',
            align: 'center',
        },
        {
            title: '상품 선택',
            key: 'action',
            align: 'center',
            render: (value, record, index) => (
                <Button
                    className={
                        'ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink'
                    }
                    value={record.id}
                    onClick={pickButton}
                    size="middle"
                >
                    <a>선택</a>
                </Button>
            ),
        },
    ];
    return (
        <>
            {contextHolder}
            <section className="wrap-section wrap-datagrid">
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-24 fc-gray-700">상품 조회 결과</h2>
                    </div>
                </div>
                <div className="box-body">
                    {/*    테이블 자리*/}
                    <Table
                        columns={columns}
                        dataSource={datas}
                        pagination={{
                            total: datas?.length,
                            showTotal: showTotals,
                            size: 'default',
                        }}
                        bordered
                    />
                </div>
            </section>
        </>
    );
};
