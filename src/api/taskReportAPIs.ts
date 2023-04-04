import { UploadFile } from 'antd';
import API, { APIFILE } from './ApiService';

export const TaskReportAPIs = () => ({
    //파일 저장하기
    saveFiles: (parameter: { formData: UploadFile; taskName: string }) =>
        APIFILE.post('/api/v1/files', {
            formData: parameter.formData,
            taskName: parameter.taskName,
            adminId: localStorage.getItem('ID'),
        }),
    //작업 내용 불러오기
    getTaskRequestLists: () => API.get('/api/v1/task-request/lists'),
    //파일 불러오기
    getFiles: (parameter: { formData: UploadFile; taskName: string }) =>
        API.post('/api/v1/files', {
            formData: parameter.formData,
            taskName: parameter.taskName,
            adminId: localStorage.getItem('ID'),
        }),
    //
    //파일 다운로드
    getFileDownload: () => API.get('/api/v1/down/files'),
});
