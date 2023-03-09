import axios from 'axios';

//헤더가 필요한!!
const API = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        ImSulbinHeader: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'application/json',
    },
});

export default API;
