<template>
    <div class="login-form">
        <div class="form-main">
            <div class="title">登录账号</div>
            <img src="@/assets/login/login-logo.png" class="login-logo"/>
            <form class="form" @keyup.enter="handleLogin">
                <div class="form-item">
                    <span class="form-item-text">账号</span>
                    <input type="text"  placeholder="请输入您的账号" />
                </div>
                <div class="form-item">
                    <span class="form-item-text">密码</span>
                    <div class="item2">
                        <input :type="showPassword ? 'text' : 'password'"  placeholder="请输入您的密码" />
                            <div class="form-item__eye form-item__icon" @click="showPassword = !showPassword">
                                <img v-if="showPassword" src="@/assets/login/icon-eye.png" />
                                <img v-else src="@/assets/login/icon-eye-close.png" />
                            </div>
                    </div>
                </div>
            </form>
            <div v-if="loading" class="button-login button-login--disabled">登录中...</div>
            <div v-else class="button-login" @click="handleLogin">登录</div>
            <div class="tip">还没有账号？<a href="/#/register">去注册</a></div>
        </div>
    </div>
</template>
<script setup>
const showPassword = ref(false)
</script>
<style lang='scss' scoped>
.login-form{
    width: 528px;
    height: 510px;
    border-radius: 4px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    position: absolute; 
    top: 260px; // 设置顶部偏移
    left: 50%; // 左侧偏移50%
    transform: translateX(-50%); // 通过变换使container水平居中
    
}
.login-logo{
    margin: 12px 0 40px 0;
}
.title{
    font-size: 24px;
    font-weight: bold;
    margin-top: 64px;
}
.form-main{
    width: 368px;
    margin: 0 auto;
    text-align: center;
}
.form-item{
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
}
.form-item-text{
    font-size: 14px;
    font-weight: 600;
    margin-right: auto;
    margin-bottom: 8px;
}
.item2{
    // display: flex;
    position: relative;
}
.form-item__icon {
    position: absolute;
    z-index: 1;
    top: 12px;
    right: 12px;
    cursor: pointer;
}

input{
    padding-left: 16px;
    height: 37px;
    width: 348px;
    border-radius: 4px;
    font-size: 14px;
    border: solid 1px #d9d9d9;
    &::placeholder {
        color:#000;
        opacity: 0.3;
    }
    outline-color: #e92937;
}
input::-webkit-input-placeholder {
    position: absolute;
    left: 16px; /* 调整到所需位置 */
}
.button-login{
    width: 100%;
    line-height: 48px;
    height: 48px;
    border-radius: 4px;
    background-color: #e92937;
    margin-top: 48px;
    color: #fff;
    cursor: pointer;
}
.button-login--disabled{
    background-color: #f8f9fa;
    color: #000;
    opacity: 0.3;
    cursor: not-allowed;
}
.tip{
    margin-top: 14px;
}
a{
    text-decoration: none; //去下划线
}
a:visited{color:#e92937} //改link颜色

</style>