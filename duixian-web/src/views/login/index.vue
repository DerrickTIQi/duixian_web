<template>
    <div class="page">
        <div class="mask"></div>
        <div class="header">
            <a href="#/"><img src="@/assets/logo.png"  style="cursor: pointer;"/></a>
            <span class="kefu">客服QQ: <span class="qq">763643616</span></span>
        </div>
        <div class="container">
            <div class="main">
                <LoginForm v-if="isLoginPage"/>
                <RegisterForm v-else/>
            </div>
            <div class="footer">Copyright © 2022-2023 Dduixian.ALL Rights Reserved</div>
        </div>
    </div>
</template>
<script setup>
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';

const route = useRoute();
const router = useRouter()

const isLoginPage = computed(() => {
    console.log(route.path);
    return route.path === '/login'; // 使用route获取当前路径，根据当前路由路径判断
    
      
})


</script>
<style lang='scss' scoped>
.page{
    background-color: #f8f9fa;
    height: 100vh;
}
.mask {
    height: 400px;
    background: url('/src/assets/login/login.png');
    display: flex; 
    position: relative;
}


.header {
    display: flex;
    align-items: center;
    width: 1200px;
    position: absolute; // 绝对定位
    top: 0; // 顶部对齐
    left: 50%; // 左侧偏移50%
    transform: translateX(-50%); // 通过变换使header水平居中
}
.kefu{
    font-size: 20px;
    margin-left: auto;
}
.qq{
    font-size: 20px;
    font-weight: bold;
}
.footer {
  position: fixed; //固定定位
  left: 0;
  bottom: 16px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  opacity: 0.3;
  color: #000;
}
</style>