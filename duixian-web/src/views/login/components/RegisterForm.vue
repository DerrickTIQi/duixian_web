<template>
    <div class="login-form">
        <div class="form-main">
            <div class="title">注册账号</div>
            <img src="@/assets/login/login-logo.png" class="login-logo" />
            <form class="form" @keyup.enter="handleLogin">
                <div class="form-item">
                    <span class="form-item-text">账号</span>
                    <input type="text" v-model="formData.username"  placeholder="请输入您的账号" />
                </div>
                <div class="form-item">
                    <span class="form-item-text">邀请码</span>
                    <input type="text" v-model="formData.invite_code"  placeholder="请填写邀请码(可不填)" />
                </div>
                <div class="form-item">
                    <span class="form-item-text">登录密码</span>
                    <div class="item2">
                        <input :type="showPassword ? 'text' : 'password'"  v-model="formData.password" placeholder="请输入您的登录密码" />
                            <div class="form-item__eye form-item__icon" @click="showPassword = !showPassword">
                                <img v-if="showPassword" src="@/assets/login/icon-eye.png" />
                                <img v-else src="@/assets/login/icon-eye-close.png" />
                            </div>
                    </div>
                </div>
                <div class="form-item">
                    <span class="form-item-text">确认密码</span>
                    <div class="item2">
                        <input :type="showPasswordtwo ? 'text' : 'password'" v-model="formData.password1"  placeholder="请再次输入您的登录密码" />
                            <div class="form-item__eye form-item__icon" @click="showPasswordtwo = !showPasswordtwo">
                                <img v-if="showPasswordtwo" src="@/assets/login/icon-eye.png" />
                                <img v-else src="@/assets/login/icon-eye-close.png" />
                            </div>
                    </div>
                </div>
                <div class="check">
                    <el-checkbox v-model="agreePolicy" size="large">同意并愿意遵守对线体育的 隐私政策 和 使用条款。</el-checkbox>
                </div>
            </form>
            <div v-if="loading" class="button-login button-login--disabled">注册中...</div>
            <div v-else class="button-login" @click="handleLogin">注册</div>
            <div class="tip">已有账号？<a href="#/login">立即登录</a></div>
        </div>
    </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { useRequest } from '@/hooks/request'
const userStore = useUserStore()
const formData = reactive({})
const showPassword = ref(false)
const showPasswordtwo = ref(false)
const agreePolicy = ref(false) // 用于跟踪checkbox状态
const { loading, request } = useRequest(async () => {
  return register(formData).then(res => {
    userStore.registerSuccess(res)
  })
}, false)

const handleLogin = () => {
  if (!formData.username || formData.username == '') return ElMessage.warning('请输入用户名')
  if (!formData.password || formData.password == '') return ElMessage.warning('请输入密码')
  if (!formData.password1 || formData.password1 == '') return ElMessage.warning('请再次输入密码')
  if (formData.password !== formData.password1) return ElMessage.warning('确认密码不一致');
  if (!agreePolicy.value) return ElMessage.warning('需要同意协议')
  request()
}

</script>
<style lang='scss' scoped>
.login-form{
    width: 528px;
    height: 730px;
    border-radius: 4px;
    box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    position: absolute; 
    top: 160px; // 设置顶部偏移
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
.check{
    margin-top: -20px;
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
<style >
.check .el-checkbox.el-checkbox--large .el-checkbox__inner{
    width: 16px;
    height: 16px;
}
.check .el-checkbox__label{
    color: rgba(0, 0, 0, 0.7);
}
.check .el-checkbox:last-of-type {
    margin-right: 30px;
}
.check .el-checkbox__inner::after{
    height: 10px;
    left: 5px;
    top: 0;
    width: 4px;
}
.check .el-checkbox{
    --el-checkbox-checked-text-color:#e92937 ;
    --el-checkbox-checked-input-border-color: #e92937;
    --el-checkbox-checked-bg-color: #e92937;
    --el-checkbox-input-border-color-hover: #e92937;
}
</style>