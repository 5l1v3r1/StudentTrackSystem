import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout.vue';
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
        component: () => import('@/views/404.vue'),
        meta: { hidden: true },
    },
];
export const asyncRouterMap = [
    {
        path: '/gösterge-paneli',
        component: Layout,
        meta: {
            title: 'Gösterge Paneli',
            icon: 'table',
            roles: [1]
        },
        children: [
            {
                name: 'dashboard',
                path: '',
                component: () => import('@/views/dashboard/index.vue'),
            }
        ]
    },
    {
        path: '/rapor-islem',
        component: Layout,
        redirect: '/rapor-islem/cetele-genel-toplam',
        name: 'raporislem',
        meta: {
            title: 'Rapor İşlemleri',
            roles: [1]
        },
        children: [
            {
                path: 'cetele-genel-toplam',
                component: () => import('@/views/raporislem/index.vue'),
                name: 'CeteleGenelToplam',
                meta: {
                    title: 'Genel Toplam',
                    icon: 'excel',
                }
            }
        ]
    },
    {
        path: '/talebe-islem',
        component: Layout,
        meta: {
            roles: [1, 2, 4]
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
        path: '/cetele-islem/:name',
        component: Layout,
        meta: {
            roles: [1, 2, 4],
            hidden: true
        },
        children: [
            {
                path: '',
                component: () => import('@/views/cetele/ceteleislem/index.vue'),
                meta: { title: 'Çetele İşlem', noCache: true },
                name: 'CeteleIslem',
                hidden: true,
            }
        ],
    },
    {
        path: '/kur-islem/:name',
        component: Layout,
        meta: {
            roles: [1, 2, 4],
            hidden: true
        },
        children: [
            {
                path: '',
                component: () => import('@/views/kur/kurislem/index.vue'),
                meta: { title: 'Kur İşlem', noCache: true },
                name: 'KurIslem',
                hidden: true,
            }
        ],
    },
    {
        path: '/profil-islem/:name',
        component: Layout,
        meta: {
            roles: [1, 2, 4],
            hidden: true
        },
        children: [
            {
                path: '',
                component: () => import('@/views/profil/profilislem/index.vue'),
                meta: { title: 'Profil İşlem', noCache: true },
                name: 'ProfilIslem',
                hidden: true,
            }
        ],
    },
    {
        path: '/',
        component: Layout,
        redirect: '/cetele-doldur',
        meta: { hidden: false },
        children: [{
                path: 'cetele-doldur',
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
