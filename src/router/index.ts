import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue';
import {syllabusRoutes} from "@/router/modules/syllabusRoutes";
import {dailystudyRoutes} from "@/router/modules/dailystudyRoutes";

Vue.use(Router);
// bunu diyerek iki objeyede her componentten erişimi sağladık.
// this.$router is the router object
// this.$route is the current route object

/**
 * note: sub-menu only appear when children.length>=1

 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
   role: ['admin','editor']     will control the page role (you can set multiple roles)
   title: 'title'               the name show in submenu and breadcrumb (recommend set)
   icon: 'svg-name'             the icon show in the sidebar,
   noCache: true                if fasle ,the page will no be cached(default is false)
 }
 **/

/**
 Lazy loading of the route should be a function that will be used for writing larger projects.
 The corresponding component will only be loaded when the component is used.
 This greatly reduces the size of the initial page js and makes better use of the browser.

 const Foo = resolve => require(['./Foo.vue'], resolve)
 or
 const Foo = () => import('./Foo');
 **/


export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: { hidden: true }
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue') ,
        meta: { hidden: true },
    },

];

export const asyncRouterMap = [
    {
        path: '/report',
        component: Layout,
        redirect: '/report/dailystudy',
        name: 'report',
        meta: {
            title: 'Take Daily Study Report',
            roles: [4]
        },
        children: [
            {
                path: 'dailystudy',
                component: () => import('@/views/report/index.vue'),
                name: 'StatisticsDailyStudy',
                meta: {
                    title: 'Statistics',
                    icon: 'excel',
                    affix: true
                },

            }
        ]
    },
    {
        path: '/student-operations',
        component: Layout,
        name: 'StudentOperations',
        redirect: {name: 'StudentList'},
        meta: {
            roles: [4],
            title: "Student Operations",
            icon: 'table'
        },
        children: [
            {
                path: 'student-list',
                name: 'StudentList',
                meta: { title: 'Student List' },
                component: () => import('@/views/studentoperations/index.vue')
            }
        ]
    },

    ...dailystudyRoutes,

    ...syllabusRoutes,

    /*
    {
        path: '/',
        component: Layout,
        redirect: '/daily-study/fill',
        meta: { hidden: false },
        children: [{
            path: 'daily-study/fill',
            name: 'DailyStudyFill',
            component: () => import('@/views/dailystudy/fill.vue'),
            meta: { title: 'Fill Daily Study', icon: 'form' }
        }],
    },
    */
    {
        path: '/',
        component: Layout,
        meta: {hidden: true},
    },
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true },
    }
];



const router = new Router({
    mode: 'history',
    routes: constantRouterMap
});


export default router;
