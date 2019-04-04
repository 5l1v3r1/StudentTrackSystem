import request from '@/utils/request';

export const GetMyClassroomAsync = () =>
    request({
       url: '/api/admin/classroom/myclassrooms/',
       method: 'get'
    });

