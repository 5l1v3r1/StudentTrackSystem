import service from "@/utils/request";
import {Course} from "@/models/Course";
import {CourseGroup} from "@/models/CourseGroup";


export const GetMyCoursesListAsync = () =>
    service.request({
        url: '/api/course-group/mycourses/',
        method: 'get',
    });

export const GetAllCourseGroups = () =>
    service.request({
        url: '/api/course-group/',
        method: 'get'
    });

export const GetCourseGroupByGroupIdAsync = (groupId: number) =>
    service.request<CourseGroup>({
        url: `/api/course-group/${groupId}/`,
        method: 'get'
    });

export const GetCourseByIdAsync = (courseId: number) =>
    service.request<Course>({
        url: `/api/course/${courseId}/`,
        method: 'get'
    });


export const GetCoursesByGroupId = async (groupId: number): Promise<Array<Course>> => {
    const courseList: Array<Course> = [];
    try {
        const { data: courseGroup } = await GetCourseGroupByGroupIdAsync(groupId);

        for (let id of courseGroup.courses) {
            const {data: course} = await GetCourseByIdAsync(id);
            courseList.push(course);
        }
    }
    catch (e) {
        console.warn("GetCoursesByGroupId" + e);
    }
    return courseList;
};

