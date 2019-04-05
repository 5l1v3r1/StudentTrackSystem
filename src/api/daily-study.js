import request from '@/utils/request';
export const GetTodayDailyStudyAsync = () => request({
    url: '/api/daily-study/today/',
    method: 'get'
});
export const SendDailyStudyAsync = (id, studies) => request({
    url: '/api/daily-study/' + id + '/',
    method: 'put',
    data: {
        studies
    }
});
