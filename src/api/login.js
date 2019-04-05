import request from '@/utils/request';
export const LoginAsync = (username, password) => request({
    url: '/api/login',
    method: 'post',
    data: {
        username,
        password
    }
});
