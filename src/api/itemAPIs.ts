import API from './apiService';

//ItemApi
export const ItemAPIs = () => ({
    //상품 조회
    getItemList: (parameter: { itemNo: string; itemName: string }) =>
        API.get('/api/item/find', {
            params: {
                itemnumber: parameter.itemNo,
                itemname: parameter.itemName,
            },
        }),
    getItemListJoinAdWhereItemNameAndItemNo: (parameter: {
        itemNo: string;
        itemName: string;
        advId: string;
        agroupId: number;
    }) =>
        API.get('/api/item/find/joinad', {
            params: {
                itemNo: parameter.itemNo,
                itemName: parameter.itemName,
                advId: parameter.advId,
                agroupId: parameter.agroupId,
            },
        }),
});
