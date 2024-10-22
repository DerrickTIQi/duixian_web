<template>
    <div class="app-header">
        <div class="header-main">
            <div class="logo">
                <img src="@/assets/logo.png" />
            </div>
            <div class="header-menu">
                <app-menu />
            </div>
            <!-- 如果有 connect，显示用户名；没有 connect，显示登录/注册按钮 -->
            <div class="header-right">
                <div v-if="hasConnect" class="header-status"  @click="toggleDropdown" :class="{ active: isDropdownVisible }">
                    <img :src="userInfo.avatar" class="title-logo"/>
                    <div>{{username}}</div>
                    <img :src="isDropdownVisible ? downSelected : downDefault" style="margin-left: 5px;"/>
                </div>
                <button v-else class="header-button" @click="handleLogin">登录/注册</button>

                <ul v-if="isDropdownVisible" class="dropdown-menu" @click.stop>
                    <li @click="handlePermissionClick" class="dropdown-item">权限信息</li>
                    <li @click="handleLogout" class="dropdown-item">退出登录</li>
                </ul>
            </div>
        </div>
        <app-drawer
        v-model="isDrawerVisible"
        :user-info="userInfo"
        />
    </div>
</template>
<script setup>
import downSelected from '@/assets/table/down-selected.png'
import downDefault from '@/assets/table/down-default.png'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
const router = useRouter();
// 用 ref 创建响应式的 hasConnect
const hasConnect = ref(false);
const isDropdownVisible = ref(false);  // 控制下拉菜单显示
const isDrawerVisible = ref(false);    // 控制抽屉显示
let userInfo = null;
try {
    userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null;
} catch (error) {
    console.error('Error parsing userInfo from localStorage', error);
}

// 检查是否获取到了用户名，如果没有则设置为空字符串
const username = userInfo && userInfo.name ? userInfo.name : '';
// 初始化按钮状态，检查 localStorage 中的 hasConnect
const initConnectStatus = () => {
    if (localStorage.hasConnect === 'on') {
        hasConnect.value = true; // 登录状态
    } else {
        hasConnect.value = false; // 登出状态
    }
};

const handleLogin = () => {
    router.push('/login')
}

// 切换下拉菜单的显示/隐藏
const toggleDropdown = (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  isDropdownVisible.value = !isDropdownVisible.value;
};
// 处理权限信息点击
const handlePermissionClick = () => {
  isDrawerVisible.value = true;  // 显示抽屉
  isDropdownVisible.value = false;  // 隐藏下拉菜单
};
// 登出函数
const handleLogout = async () => {
    const body = {
        platform: 'web',
        type: 'off',
        uid: localStorage.uid  // 从 localStorage 获取用户 ID
    };

    // 调用登出接口并根据返回值更新 localStorage 和 hasConnect
    try {
        const res = await connect(body);
        if (res === 'off') {
            localStorage.hasConnect = 'off';  // 更新 localStorage
            hasConnect.value = false;  // 更新响应式变量，按钮变为登录
            isDropdownVisible.value = !isDropdownVisible.value; // 隐藏下拉菜单
        }
    } catch (error) {
        console.error('登出失败', error);
    }

    userStore.logout();  // 调用用户 store 的 logout 方法
};

// 点击页面其他地方时关闭下拉菜单
const closeDropdown = () => {
  isDropdownVisible.value = false;
};
// 添加事件监听器，点击其他地方时关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', closeDropdown);
  initConnectStatus();
});

// 移除事件监听器
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>
<style lang='scss' scoped>
.title-logo{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 5px;
}
.app-header{
    display: flex;
    flex-direction: row;
    height: 64px;
    background-color: #fff;
}
.header-main{
    display: flex;
    width: 1200px;
    margin: 0 auto;
}
.logo{
    padding-top: 13px;
}
.header-menu{
    margin-left: 40px;
    display: flex;
}
.header-button{
    width: 88px;
    height: 32px;
    border-radius: 2px;
    border: #e92937;
    background-color: #e92937;
    color: #fff;
    margin-left: auto;
    margin-top: 16px;
}
.header-right{
    display: flex;
    margin-left: auto;
    position: relative;
}
.header-status{ 
    margin-left: auto;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}
.header-status.active{
    color: #e92937;
}
.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  right: 0;
  top: 100%;
  width: 144px;
  border-radius: 5px;
  z-index: 10000;
}
.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
}
.dropdown-item:hover{
    background-color: #f5f5f5;
}
</style>