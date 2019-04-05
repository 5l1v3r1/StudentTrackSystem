import request from '@/utils/request';
export const GetMyAccountInfoAsync = () => request({
    url: '/api/user/me/',
    method: 'get',
});
export const AdminGetUsersByClassroomIdAsync = (classroomId) => request({
    url: `/api/admin/user/classroom/${classroomId}/`,
    method: 'get'
});
