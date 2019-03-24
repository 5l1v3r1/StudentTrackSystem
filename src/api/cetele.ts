import request from '@/utils/request';
import {StudyModel} from "@/models/Study";

export const GetMyCoursesList = () => 
    request({
        url: '/api/course-group/mycourses/',
        method: 'get',
    });

export const GetTodayDailyStudy = () =>
    request({
       url: '/api/daily-study/today/',
       method: 'get'
    });

export const SendDailyStudy = (id: number, studies: StudyModel[] ) =>
    request({
        url: '/api/daily-study/'+id+'/',
        method: 'put',
        data: {
            studies
        }
    });