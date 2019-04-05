import request from "@/utils/request";
export const GetMyCoursesListAsync = () => request({
    url: '/api/course-group/mycourses/',
    method: 'get',
});
