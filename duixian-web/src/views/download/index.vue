<template>
    <div class="download">
        <div class="top">
            <div class="top-content">
                <div class="left">
                    <div class="logo"><img src="@/assets/download/logo-app.png" /></div>
                    <div class="text1">下载APP，领专属方案</div>
                    <div class="text2">进攻趋势客观分析，搭配强大赛中指标赛选器</div>
                </div>
                <div class="right"><img src="@/assets/download/download.png" /></div>
            </div>
        </div>
        <div class="butt">
            <div class="butt1">
                <div>
                    <img src="@/assets/download/android.png" class="default"/>
                    <img src="@/assets/download/android-hover.png" class="hover" />
                </div>
                <div class="butt-text">Android版</div>
            </div>
            <div class="butt2">
                <div>
                    <img src="@/assets/download/apple.png" class="default" />
                    <img src="@/assets/download/apple-hover.png" class="hover" />
                </div>
                <div class="butt-text">IOS版</div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.top{
    width: 100%;
    height: 500px;
    background-image: linear-gradient(to right, #d0eeff, #fcd4d0);
    display: flex;
}
.logo{
    margin-top: 132px;
}
.text1{
    margin-top: 15px;
}
.text2{
    margin-top: 16px;
}
.right{
    margin-left: auto;
    margin-top: 48px;
}
.top-content{
    width: 1200px;
    display: flex;
    margin: 0 auto;
}
.text1{
    font-size: 40px;
    font-weight: bold;
}
.text2{
    font-size: 16px;
}
.butt{
    display: flex;
    width: 1200px;
    margin: 0 auto;
}
.butt1,
.butt2 {
    width: 232px;
    height: 64px;
    border-radius: 4px;
    background-color: #ececec;
    margin-top: 48px;
    cursor: pointer;
    display: flex;

    div {
        position: relative;

        img.default {
            display: block; /* 默认显示 */
            margin:14px 16px 0 32px
        }

        img.hover {
            display: none; /* 初始隐藏 hover 图片 */
            margin:14px 16px 0 32px
            
        }
    }

    &:hover {
        img.default {
            display: none; /* Hover 时隐藏默认图片 */
            margin:14px 16px 0 32px
        }
        img.hover {
            display: block; /* Hover 时显示 hover 图片 */
            margin:14px 16px 0 32px
        }
    }
}
.butt1:hover{
    color: #e92937;
}
.butt2:hover{
    color: #e92937;
}
.butt-text{
    display: flex;
    align-items: center;
    font-size: 24px;
}

.butt2{
    margin-left: 24px;
    width: 186px;
}
</style>