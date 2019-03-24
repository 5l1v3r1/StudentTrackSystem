import axios, { AxiosTransformer } from 'axios';
import { getToken } from './auth';
import { Message } from 'element-ui';
import humps from 'humps';

// transformRequest: [...axios.defaults.transformRequest, myCustomTransformer]
// If you want it to be really safe, there's also this 

const defaultTransformers = (): AxiosTransformer[] => {
  const { transformRequest } = axios.defaults;
  if (!transformRequest) {
    return [];
  } else if (transformRequest instanceof Array) {
    return transformRequest;
  } else {
    return [transformRequest];
  }
};

const service = axios.create({
    baseURL: "http://cetelem.disgem.org:1899/",

    //transformResponse: [...defaultTransformers(), data => humps.camelizeKeys(data)],
    //transformRequest: [ data => humps.decamelizeKeys(data), ...defaultTransformers() ],
    timeout: 5000,
})

service.interceptors.request.use(
    config => {
        config.headers.post['Content-Type'] = 'application/json';
        config.headers.common['Authorization'] = getToken();
        return config
    },
    error => {
      console.log(error) 
      Message({
        message: "sa",
        type: 'error',
        duration: 5 * 1000
      })
      Promise.reject(error)
    }
)

export default service;