import request from '@/utils/request';
import {Study} from "@/models/Study";

export const GetTodayDailyStudyAsync = () =>
    request({
       url: '/api/daily-study/today/',
       method: 'get'
    });

export const SendDailyStudyAsync = (id: number, studies: Study[]) =>
    request({
        url: '/api/daily-study/'+id+'/',
        method: 'put',
        data: {
            studies
        }
    });