import axios from 'axios';
import { getToken } from './auth';
import { Message } from 'element-ui';
const service = axios.create({
    baseURL: "http://cetelem.disgem.org:1899/",
    timeout: 5000,
});
service.interceptors.request.use(config => {
    config.headers.post['Content-Type'] = 'application/json';
    config.headers.common['Authorization'] = getToken();
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
});
service.interceptors.response.use(response => {
    return response;
}, error => {
    Message({
        message: error.response.data.detail,
        type: 'error',
        duration: 3 * 1000
    });
    return Promise.reject(error);
});
export default service;
