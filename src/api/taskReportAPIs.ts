import { UploadFile } from 'antd';
import axios from 'axios';

export const APIs = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        ImSulbinHeader: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'multipart/form-data',
    },
});
export const TaskReportAPIs = () => ({
    //키워드 리스트
    saveFiles: (parameter: { formData: UploadFile }) =>
        APIs.post('/api/v1/files', {
            formData: parameter.formData,
        }),
});
