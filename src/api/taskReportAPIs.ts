import API from './ApiService';

export const TaskReportAPIs = () => ({
    //키워드 리스트
    saveFiles: (parameter: { formData: any }) =>
        API.post('/api/v1/files', {
            formData: parameter.formData,
        }),
});
