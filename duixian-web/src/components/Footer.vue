<template>
    <div class="app-footer">
        <div class="logo">
            <img src="../assets/footer.png" class="logoimg" />
        </div>
        <div>
            <span class="lianxi">联系我们</span>
        </div>
        <div class="content">
            <div class="text">
                <sapn>
                    声明：本网资讯仅供体育爱好者进行比赛浏览观看研究之用，任何人不得用于非法用途，否则责任自负。 
                </sapn>
                <sapn style="margin-top: 10px;">
                    Copyright © 2022-2023 Duixian.ALL Rights Reserved
                </sapn>
            </div>
            <div class="contact">
                <div class="email">
                    <img src="../assets/email.png" style="padding-right: 10px;"/>
                    <span>邮箱 : 763643616@qq.com</span>
                </div>
                <div class="qq" style="margin-top: 10px;">
                    <img src="../assets/qq.png" style="padding-right: 12px;"/>
                    <span>客服QQ : 763643616</span>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.app-footer{
    height: 194px;
    background-color: #333;
}
.logo{
    padding: 30px 0 0 380px;
    
}
.logoimg{
    border: 1px solid #fff;
    padding: 10px 20px 10px 20px;
}
.lianxi{
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    padding: 0 0 0 1234px;
}
.content{
    padding: 0 0 0 380px;
    display: flex;
    margin-top: 10px;
}
.text{
    display: flex;
    flex-direction: column;
    color: #fff;
    font-size: 12px;
}
.contact{
    padding: 0 0 0 300px;
    color: #fff;
    font-size: 12px;
}
</style>