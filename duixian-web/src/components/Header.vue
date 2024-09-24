<template>
    <div class="app-header">
        <div class="header-main">
            <div class="logo">
                <img src="../assets/logo.png" />
            </div>
            <div class="header-menu">
                <app-menu />
            </div>
            <button class="header-button" @click="handleLogin()">登录/注册</button>
        </div>
        
    </div>
</template>
<script setup>
const router = useRouter();
const handleLogin = () => {
    router.push('/login')
}
</script>
<style lang='scss' scoped>
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


</style>