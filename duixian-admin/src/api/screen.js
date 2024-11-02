import  http  from "@/utils/http"
//精选方案
export const Plans = data =>
    http.post('/oddsindex/minfo/duixian_plans',data)
//近10场比赛
export const historyLastTen = data =>
    http.post('/oddsindex/minfo/duixian_history/last_10',data)
//实时联赛
export const Leagues = data =>
    http.get('/oddsindex/leagues')
//我的方案[静态列表]
export const myPlans = data =>
    http.post('/oddsindex/minfo/my_plans',data)
//订阅方案
export const buyPlan = data =>
    http.post('/oddsindex/minfo/duixian_plan/buy',data)
//复制方案
export const copyPlan = data =>
    http.post('/oddsindex/minfo/duixian_plan/copy',data)
//删除方案
export const deletePlan = data =>
    http.post('/oddsindex/delete_filter',data)
//配置过滤器(新增&修改)
export const setFilter = data =>
    http.post('/oddsindex/set_filter',data)
//对线数据
export const ftInplay = data =>
    http.post('/oddsindex/minfo/duixian/ft:inplay',data)
//我的方案[提示接口]
export const myPlansNew = data =>
    http.post('/oddsindex/minfo/my_plans_new',data)