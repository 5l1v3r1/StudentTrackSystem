import request from '@/utils/request';

export const LoginAsync = (username: string, password: string) => 
    request({
        url: '/api/login',
        method: 'post',
        data: {
            username,
            password
        }
    });
