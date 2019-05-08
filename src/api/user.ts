import service from '@/utils/request';
import {User} from "@/models/User";

export const GetMyAccountInfoAsync = () =>
    service.request({
    url: '/api/v2/user/me/',
    method: 'get',
  });

export const AdminGetUsersByClassroomIdAsync = (classroomId: number) =>
    service.request({
       url:  `/api/admin/user/classroom/${classroomId}/`,
       method: 'get'
    });

export const AdminGetAccountByUserIdAsync = (userId: number) =>
    service.request<User>({
        url: `/api/admin/user/${userId}/`,
        method: 'get'
    });

