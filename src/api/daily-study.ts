import service from '@/utils/request';
import {Study} from "@/models/Study";
import {DailyStudyOptionalParams} from "@/models/DailyStudyOptionalParams";
import {DailyStudy} from "@/models/Dailystudy";

export const GetTodayDailyStudyAsync = () =>
    service.request({
       url: '/api/daily-study/today/',
       method: 'get'
    });

export const SendDailyStudyAsync = (id: number, studies: Study[]) =>
    service.request({
        url: '/api/daily-study/'+id+'/',
        method: 'put',
        data: {
            studies
        }
    });

export const AdminGetDailyStudyByIdAsync = (dailyStudyId: number,
                                            urlParams: DailyStudyOptionalParams = {}) =>
    service.request<DailyStudy>({
        url: `/api/admin/daily-study/${dailyStudyId}/`,
        method: 'get',
        params: urlParams
    });

export const AdminGetTodayDailyStudy = (userId: number) =>
    service.request<DailyStudy>({
        url: `/api/admin/daily-study/today/user/${userId}/`,
        method:'get'
    });

export const AdminSendDailyStudy = (dailyStudyId: number, studies: Study[], userId: number) =>
    service.request({
        url: `/api/admin/daily-study/${dailyStudyId}/`,
        method: 'put',
        data: {
            studies: studies,
            user: userId
        }
    });

export const AdminGetDailyStudies = (urlParams: DailyStudyOptionalParams = {}) =>
    service.request<Array<DailyStudy>>({
        url: '/api/admin/daily-study/',
        method: 'get',
        params: urlParams
    })
