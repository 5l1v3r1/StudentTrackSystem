import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout.vue';

Vue.use(Router);

/**
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
        path: '/talebeislem',
        component: Layout,
        meta: {
            roles: [4]
        },
        children: [
            {
                path: '',
                component: () => import('@/views/talebeislem/index.vue'),
                name: 'TalebeIslem',
                meta: {
                    title: 'Talebe İşlemleri',
                    icon: 'table',
                }
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/ceteledoldur',
        meta: { hidden: false },
        children: [{
            path: 'ceteledoldur',
            name: 'CeteleDoldur',
            component: () => import('@/views/cetele/ceteledoldur/index.vue'),
            meta: { title: 'Çetele Doldur', icon: 'form' }
        }],
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