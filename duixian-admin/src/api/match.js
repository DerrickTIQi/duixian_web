import  http  from "@/utils/http"
//赛事数据(全)(滚球)
export const listAllLive = data =>
    http.post('/oddsindex/minfo/list_all/live',data)
//赛事数据[更新](滚球)
export const listUpLive = data =>
    http.post('/oddsindex/minfo/list_up/live',data)
//赛事详情(滚球)
export const detailLive = data =>
    http.post('/oddsindex/minfo/detail/live',data)
//赛事详情(早盘)
export const detailEarly = data =>
    http.post('/oddsindex/minfo/detail/early',data)
//赛事详情(赛果)
export const detailRecord = data =>
    http.post('/oddsindex/minfo/detail/record',data)

//赛事筛选条件(早盘赛事)
export const filterEarly = data =>
    http.post('/oddsindex/minfo/filter/early',data)
//赛事筛选条件(赛果)
export const filterRecord = data =>
    http.post('/oddsindex/minfo/filter/record',data)
//赛事数据(赛果)
export const listRecord = data =>
    http.post('/oddsindex/minfo/list/record',data)
//赛事数据[分页](早盘赛事)
export const listEarly = data =>
    http.post('/oddsindex/minfo/list/early',data)
//赛事收藏(添加)
export const favorAdd = data =>
    http.post('/oddsindex/minfo/make_favor/add',data)
//赛事收藏(删除)
export const favorDelete = data =>
    http.post('/oddsindex/minfo/make_favor/delete',data)
//关注数据(滚球数据) 
export const favorLive = data =>
    http.post('/oddsindex/minfo/favor_list_all/live',data)
//关注数据(更新) 
export const favorUpLive = data =>
    http.post('/oddsindex/minfo/favor_list_up/live',data)
//赛事收藏列表(早盘赛事)
export const favorEarly = data =>
    http.post('/oddsindex/minfo/favor_list/early',data)


