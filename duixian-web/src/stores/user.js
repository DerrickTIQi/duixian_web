import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { connect, UserInfo } from '../api/user'

const TOKEN_KEY = 'token'

export const useUserStore = defineStore('user', () => {
  const route = useRoute()
  const router = useRouter()

  const token = ref(localStorage[TOKEN_KEY])
  // const expires = ref(localStorage.expires)
  const userInfo = ref(JSON.parse(localStorage.userInfo || '{}'))
  

  // 判断是否登录
  const checkLogin = (isGoLogin = true) => {
    token.value = localStorage[TOKEN_KEY]
    // expires.value = localStorage.expires

    if (token.value) {
      return true
    } else {
      if (isGoLogin){
        ElMessage.warning('Token过期或无效,请重新登录')
        logout(true)
      } 
      return false
    }
  }
  // 计算用户角色
  const roles = computed(() => {
    if (!token.value) {
      localStorage.uid = 0
      return 'tourist'; // 游客
    } else if (userInfo.value && userInfo.value.roles && userInfo.value.roles.length > 0) {
      return 'member'; // 会员用户
    } else {
      return 'normal'; // 普通用户
    }
  });

  // //检测账号是否有效
  // const checkInfo = () => {
  //   const body = {
  //     token: localStorage.checkToken,
  //     plant_code: localStorage.plant_code
  //   }
  //   if(!localStorage.checkToken) return
  //   userCheck(body)
  // }
  // checkInfo()
  // setInterval(checkInfo, 60 * 1000 * 5)



  // 登录成功
  const loginSuccess = async options => {
    
    UserInfo().then(res => {
      
      localStorage.userInfo = JSON.stringify(res)
      localStorage.uid = res.id
      // const uid = JSON.parse(localStorage.userInfo).id
      const body ={
        platform: 'web',
        registration_id: 0,
        type: 'on',
        uid: localStorage.uid
      }
      connect(body).then(res => {
        localStorage.hasConnect = res
      })
      ElMessage.success('登录成功');
    })
    // localStorage.utype = options.utype //获取用户类型

    // localStorage.expires = options.expires  //获取当前的token过期时间 存到localStorage.expires

    
    
    // localStorage.roles = JSON.stringify(options.roles)
    // 刷新页面并跳转到 "/home"
    setTimeout(() => {
      window.location.replace('/');  // 刷新页面并跳转到首页
    }, 1000);
  }

  const registerSuccess = async options => {
    ElMessage.success('注册成功');
    router.replace({
      path: '#/login'
    })
  }


  // // 获取用户信息
  // const getUserInfo = () => {
  //   return getUserInfoApi().then(res => {
  //     userInfo.value = res.data
  //     return res.data
  //   })
  // }

  // 退出
  const logout = () => {
    localStorage.clear()
    ElMessage.success('退出成功');
    userInfo.value = null
    token.value = null
    router.replace({
      path: '/',
    })
  }

  return {
    userInfo,
    roles,
    registerSuccess,
    checkLogin,
    loginSuccess,
    // getUserInfo,
    logout,
  }
})
