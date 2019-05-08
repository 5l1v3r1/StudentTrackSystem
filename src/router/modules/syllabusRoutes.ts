import Layout from "@/views/layout/Layout.vue";
import {LevelCourse} from "@/models/LevelCourse";
export const syllabusRoutes = [
    {
        path: '/syllabus-list/:userName/:userId(\\d+)',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '',
                name: 'SyllabusList',
                component: () => import('@/views/syllabus/syllabus.vue'),
                meta: { title: 'Syllabus Levels' },
                props: true
            }
        ]
    },
    {
        path: '/syllabus-list/syllabus/:kurNo/:userName/:userId(\\d+)',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '',
                name: 'KurCoursesList',
                component: () => import('@/views/syllabus/syllabuscourses.vue'),
                meta: { title: `Syllabus Courses` },
                props: true
            }
        ]
    },

    {
        path: '/syllabus-list/syllabus/:kurNo/:courseName/:userName/:userId(\\d+)',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '',
                name: 'CourseContentList',
                component: () => import('@/views/syllabus/coursecontent.vue'),
                meta: { title: 'Contents' },
                props: (route) => (
                    { courseId: route.query.courseId, ...route.params}
                )
            }
        ]
    }
];
