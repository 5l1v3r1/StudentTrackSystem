import axios, { AxiosTransformer } from 'axios';
import { getToken } from './auth';
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: "http://ec2-18-185-137-160.eu-central-1.compute.amazonaws.com/",
    timeout: 5000,
});

service.interceptors.request.use(
    config => {
        config.headers.post['Content-Type'] = 'application/json';
        config.headers.common['Authorization'] = getToken();
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
);

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        Message({
            message: error.response.data.detail,
            type: 'error',
            duration: 3 * 1000
        });
        return Promise.reject(error);
    }
);

export default service;
