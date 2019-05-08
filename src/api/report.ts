import request from '@/utils/request';

export const GetDailyStudiesAsync = (regionId: number, groupId: string,
                                     beginingDate: string,
                                     endDate: string,
                                     isValidated: boolean) =>
    request({
        url: `/api/report/daily-study/admin/`,
        method: 'get',
        params: {
            region: regionId,
            group: groupId,
            begining: beginingDate,
            end: endDate,
            is_validated: isValidated
        }
    });


export const GetDashboardData = () =>
    request({
        url: '/api/report/dashboard/admin/',
        method: 'get'
    });
