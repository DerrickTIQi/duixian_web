import  http  from "@/utils/http"
//登录
export const login = data =>
    http.post('/oddsindex/login',data)

//权限接口
export const UserInfo = data =>
    http.get('/oddsindex/user_info')

//注册
export const register = data =>
    http.post('/oddsindex/register',data)


//用户链接标识
export const connect = data =>
    http.post('/oddsindex/duixian_connect',data)
