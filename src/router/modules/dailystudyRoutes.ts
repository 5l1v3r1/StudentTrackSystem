import Layout from "@/views/layout/Layout.vue";

export const dailystudyRoutes = [


    {
        path: '/daily-study-dates/:userName/:userId',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '',
                name: 'DailyStudyDates',
                component: () => import('@/views/dailystudy/list.vue'),
                meta: { title: 'List Daily Studies' },
                props: true
            }
        ]
    },
    {
        path: '/daily-study/:userName/:userId(\\d+)',
        component: Layout,
        meta: { hidden: true },
        children: [
            {
                path: '',
                name: 'FillDailyStudyWithParams',
                meta: { title: 'Fill Daily Study' },
                component: () => import('@/views/dailystudy/fill.vue'),
                //props: true,
                props: (route) => (
                    { dailyStudyId: route.query.id, ...route.params}
                )
            },
        ]
    },
    {
        path: '/daily-study',
        component: Layout,
        meta: { title: 'Fill Daily Study', icon: 'form', roles: [8] },
        children: [
            {
                path: '',
                name: 'FillDailyStudy',
                meta: { title: 'Fill Daily Study' },
                component: () => import('@/views/dailystudy/fill.vue'),
            },
        ]
    }
];
