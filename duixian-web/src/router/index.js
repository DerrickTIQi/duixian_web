import { createRouter,createWebHashHistory } from "vue-router"
import autoPage from '../utils/auto-route'


const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            component: () => import('@/components/Layout.vue'),
            children: [
                ...autoPage(),
                {
                  path: '/Match/:id', // 赛事详情页
                  component: () => import('@/views/match/matchDetail/index.vue'), // 赛事详情页组件
                  meta: { rootPath: '/Match' } // 确保activeMenu仍指向赛事
                }
              ],
            redirect: '/Home',
        }
    ]
})

export default router