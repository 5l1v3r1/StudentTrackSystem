import request from "@/utils/request";
import {Course} from "@/models/Course";


export const GetMyCoursesListAsync = () =>
    request({
        url: '/api/course-group/mycourses/',
        method: 'get',
    });