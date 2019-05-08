import service from "@/utils/request";
import {Course} from "@/models/Course";
import {LevelCourse} from "@/models/LevelCourse";
import {Content} from "@/models/Content";
import {UserSyllabus} from "@/models/UserSyllabus";


export const GetLevelsAsync = () =>
    service.request({
        url: '/api/syllabus/levels/',
        method: 'get'
    });

export const GetCoursesByLevelAsync = (level: string) =>
    service.request<Array<LevelCourse>>(({
        url: `/api/syllabus/level/${level}/courses/`,
        method: 'get'
    }));

export const GetContentsBySyllabusId = (sylId: string) =>
    service.request<Content[]>({
        url: `/api/syllabus/${sylId}/contents/`,
        method: 'get'
    });

export const AdminGetUserSyllabusAsync = (urlParams: {}) =>
    service.request<UserSyllabus[]>({
        url: '/api/admin/user-syllabus/',
        method: 'get',
        params: urlParams
    });

export const AdminCreateUserSyllabus = (contentInfo: object) =>
    service.request<UserSyllabus>({
       url: '/api/admin/user-syllabus/',
       method: 'post',
       data: contentInfo
    });

export const AdminValidateUserSyllabusObjectById = (id: number, contentInfo: object) =>
    service.request({
        url : `/api/admin/user-syllabus/${id}/validate/`,
        method: 'put',
        data: contentInfo
    });

export const AdminDeleteUserSyllabusObjectById = (id: number) =>
    service.request({
        url: `/api/admin/user-syllabus/${id}/`,
        method: 'delete'
    });
