import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'


const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  withCredentials: false,
})


// 请求拦截器
instance.interceptors.request.use(
  config => {
    config = {
      neddLogin: true,
      ...config,
    }
    if (config.neddLogin){
      config.headers.Authorization = localStorage.token
    } 

    
    return config
  },
  error => {
    ElMessage.error('请求超时')
    Promise.reject(error)
  }
)

// 相应拦截器
instance.interceptors.response.use(
  response => {
    const { data, status } = response

    if (status && status == 200) {
      if ([401, 403].includes(data.code)) {
        ElMessage.warning('账号已过期，请重新登录')
        // const userStore = useUserStore()
        // userStore.logout()
        return Promise.reject(data)
      } else if (data.code != 0) {
        ElMessage.error(data.msg)
        return Promise.reject(data)
      }
      if(data.token){
        localStorage.token = 'TOKEN ' + data.token
      }
      return data.data
    } else {
      ElMessage.error('接口错误')
      return Promise.reject(data)
    }
    
    
  },
  error => {
    if ([401, 403].includes(error?.response?.status)) {
      ElMessage.warning('账号已过期，请重新登录')
      // const userStore = useUserStore()
      // userStore.logout()
      return
    }

    ElMessage.error('请求超时')
    return Promise.reject(error)
  }
)

export const http = instance
export default instance
