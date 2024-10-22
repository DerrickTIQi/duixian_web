import { createRouter,createWebHashHistory, useRoute } from "vue-router"
import autoPage from '../utils/auto-route'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        { path: '/login', component: () => import('@/views/login/index.vue') },
        { path: '/register', component: () => import('@/views/login/index.vue') },
        {
            path: '/',
            component: () => import('@/components/Layout.vue'),
            children: [
                ...autoPage(),
                {
                  path: '/Match/:id/:index', // 赛事详情页
                  component: () => import('@/views/match/matchDetail/index.vue'), // 赛事详情页组件
                  meta: { rootPath: '/Match' } // 确保activeMenu仍指向赛事
                },
                {
                  path: '/MatchCourse/:id/:index', // 赛程赛事详情页
                  component: () => import('@/views/match/matchCourseDetail/index.vue'), // 赛事详情页组件
                  meta: { rootPath: '/Match' } // 确保activeMenu仍指向赛事
                },
                {
                  path: '/MatchRecord/:id/:index', // 赛程赛事详情页
                  component: () => import('@/views/match/matchCourseDetail/index.vue'), // 赛事详情页组件
                  meta: { rootPath: '/Match' } // 确保activeMenu仍指向赛事
                },
                {
                  path: '/Screen/:id/:index/:running', // 赛程赛事详情页
                  component: () => import('@/views/match/matchCourseDetail/index.vue'), // 赛事详情页组件
                  meta: { rootPath: '/Screen' } // 确保activeMenu仍指向筛选推单
                }
              ],
            redirect: '/Home',
        }
    ]
})

export default router