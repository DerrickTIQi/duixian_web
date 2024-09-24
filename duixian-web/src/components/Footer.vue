<template>
    <div class="app-footer">
        <div class="footer-main">
            <div class="top">
                <div class="logo">
                    <img src="../assets/footer.png" />
                </div>
            </div>
            <div class="content">
                <div class="ewm">
                    <img src="@/assets/ewm.png"/>
                </div>
                <div class="follow">
                    关注微信公众号联系我们
                </div>
                
                <div class="contact">
                    <div class="qq">
                        <img src="../assets/qq.png" class="qq-icon"/>
                        <span>客服QQ : 763643616</span>
                    </div>
                </div>
            </div>
            <div class="text">
                <sapn>
                    声明：本网资讯仅供体育爱好者进行比赛浏览观看研究之用，任何人不得用于非法用途，否则责任自负。 
                </sapn>
                <sapn class="brand" >
                    Copyright © 2022-2023 Duixian.ALL Rights Reserved
                </sapn>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.app-footer{
    height: 220px;
    background-color: #404245;
}
.footer-main{
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    color: #fff;
}
.top{
    display: flex;
    padding-top: 20px;
}
.follow{
    font-weight: bold;
    font-size: 16px;
    margin-top: 30px;
    margin-left: 20px;
}
.content{
    display: flex;
    margin-top: 16px;
}
.text{
    display: flex;
    flex-direction: column;
    text-align: center;
}
.ewm{
    margin-top: -15px;
}
.brand{
    text-align: center;
    margin-top: 4px; 
    font-size: 12px; 
    opacity: 0.5;
}
.contact{
    width: 200px;
    height: 30px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin-left: auto;
}
.qq{
    margin-left: 20px;
}
.qq img{
    margin-right: 5px;
}
</style>