import API from './apiService';

export const DadReportAPIs = () => ({
    getListsByDadDetId: (parameter: { id: number }) =>
        API.get('/api/v1/lists', {
            params: {
                id: parameter.id,
            },
        }),
});
