import request from '@/utils/request';

export const GetMyAccountInfoAsync = () => 
  request({
    url: '/api/user/me/',
    method: 'get',
  });