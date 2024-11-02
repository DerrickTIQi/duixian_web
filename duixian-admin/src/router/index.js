import { createRouter,createWebHashHistory, useRoute } from "vue-router"
import autoPage from '../utils/auto-route'

const router = createRouter({
    history: createWebHashHistory(), //createWebHashHistory会有#，createWebHistory不会有#
    routes:[
        { path: '/login', component: () => import('@/views/login/index.vue') },
        { path: '/register', component: () => import('@/views/login/index.vue') },
        {
            path: '/match',
            children: [
                {
                    path: '', // 为空表示 /match
                    redirect: '/match/live' // 重定向到 /match/live
                },
                {
                    path: 'live', // 路径为 /match/live
                    component: () => import('@/views/match/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'live/:id',
                    component: () => import('@/views/match/matchDetail/index.vue'),
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'early', // 路径为 /match/early
                    component: () => import('@/views/match/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/match' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'early/:id',
                    component: () => import('@/views/match/matchCourseDetail/index.vue'),
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'record', // 路径为 /match/record
                    component: () => import('@/views/match/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/match' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'record/:id',
                    component: () => import('@/views/match/matchCourseDetail/index.vue'),
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'followlive', // 路径为 /match/followlive
                    component: () => import('@/views/match/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/match' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'followlive/:id',
                    component: () => import('@/views/match/matchDetail/index.vue'),
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'followearly', // 路径为 /match/followearly
                    component: () => import('@/views/match/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/match' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'followearly/:id',
                    component: () => import('@/views/match/matchCourseDetail/index.vue'),
                    meta: { rootPath: '/match' }, // 确保activeMenu仍指向赛事
                },
            ]
        },
        {
            path: '/pre',
            children: [
                {
                    path: '', // 为空表示 /match
                    redirect: '/pre/filter' // 重定向到 /match/live
                },
                {
                    path: 'filter', // 路径为 /screen/jinxuan
                    component: () => import('@/views/pre/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/pre' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'recommend', // 路径为 /match/screen
                    component: () => import('@/views/pre/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/pre' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'follow', // 路径为 /match/record
                    component: () => import('@/views/pre/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/pre' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'save', // 路径为 /match/record
                    component: () => import('@/views/pre/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/pre' } // 确保activeMenu仍指向赛事
                },
            ]
        },

        
        {
            path: '/afoot',
            children: [
                {
                    path: '', // 为空表示 /match
                    redirect: '/afoot/filter' // 重定向到 /match/live
                },
                {
                    path: 'filter', // 路径为 /screen/jinxuan
                    component: () => import('@/views/afoot/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/afoot' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'recommend/:id/:running', 
                    component: () => import('@/views/match/matchCourseDetail/index.vue'), 
                    meta: { rootPath: '/afoot' }, // 确保activeMenu仍指向赛事
                },
                {
                    path: 'recommend', // 路径为 /match/screen
                    component: () => import('@/views/afoot/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/afoot' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'save', // 路径为 /match/record
                    component: () => import('@/views/afoot/index.vue'), // 指向 match/index.vue
                    meta: { rootPath: '/afoot' } // 确保activeMenu仍指向赛事
                },
                {
                    path: 'save/:id/:running', 
                    component: () => import('@/views/match/matchCourseDetail/index.vue'), 
                    meta: { rootPath: '/afoot' }, // 确保activeMenu仍指向赛事
                },
            ]
        },
        {
            path: '',
            component: () => import('@/components/Layout.vue'),
            children: [
                ...autoPage(),
              ],
            redirect: '/match/live',
        }
    ]
})

// 路由跳转之前
router.beforeEach((to, from) => {
    const userStore = useUserStore()
    // 登录拦截
    if (to.path == '/login') return true
    if (!userStore.checkLogin()) return '/login'
  
  })
export default router