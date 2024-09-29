<template>
    <div>
        <div class="home">
            <div class="banner">
                <el-carousel height="600px" :interval="5000">
                    <el-carousel-item v-for="carouselItem in 3" :key="carouselItem">
                        <img src="@/assets/home/banner1.png"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        
            <div class="text-one">
                <div class="text1">独有体育竞技实况进程算法，通过动态数据真实还原比赛场上的实时战况</div>
                <div class="text-text2">
                    <span class="text2">例如一场足球比赛，没有办法亲临现场观看比赛，同样能够第一时间掌握真实比赛战况，通过施压进攻曲线图，帮助你准确的分析比赛胜负，进球时间以及其他关键事件。</span>
                </div>
            </div>
            <div class="feature">
                <div class="feature-title">我们的特色</div>
                <div class="row">
                    <div class="row-item" v-for="item in rowData" :key="item">
                        <img :src="item.src" />
                        <div class="feature-text1">{{ item.text1 }}</div>
                        <div class="feature-text2">{{ item.text2 }}</div>
                    </div>
                </div>
            </div>
            <div class="text-two">
                <span class="text3">视频介绍</span>
                <span class="text4">文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案</span>
            </div>
            <div class="mp4">
                <el-carousel :interval="5000" type="card" height="450px" indicator-position="outside">
                    <el-carousel-item v-for="mp4Item in 3" :key="mp4Item">
                        <img src="@/assets/home/banner1.png"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="about">
                <div class="left">
                    <div class="left-text1">关于我们</div>
                    <div class="left-text2">深耕体育行业大数据10+年，始终致力于为广大用户提供各类体育赛事即时比分、动态数据直播、数据模型以帮助广大用户足不出户，掌握最新最真实的体育赛事实况数据，通过团队公司自主研发算法模型，打造最贴合实际的赛事进攻压力系数值，用专业的数据做出成功的计划。</div>
                    <div class="time">
                        <img src="@/assets/home/icon-tel.png" />
                        <span class="left-text">工作时间</span>
                    </div>
                    <div class="left-time">
                        <span class="left-po">周一-周五: 13:00-21:00</span>
                        <span class="left-po">周六-周日: 13:00-00:00</span>
                    </div>
                    <div class="tel">
                        <img src="@/assets/home/icon-qq.png" />
                        <span class="left-text">联系方式</span>
                    </div>
                    <div>
                        <span class="left-po">QQ: 763643616</span>
                    </div>
                </div>
                <div class="right">
                    <img src="@/assets/home/about.png" />
                </div>
            </div>
            <div class="text-two">
                <span class="text3">FAQ</span>
                <span class="text4">文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案文案</span>
            </div>
            <div class="faq">
                <div class="faq-item" v-for="faqItem in faqData" :key="faqItem">
                    <div class="faq-content">
                        <div><img :src="faqItem.src" /></div>
                        <div class="img-faq"><img src="@/assets/home/faq.png" /></div>
                        <div class="faq-text1">{{ faqItem.text1 }}</div>
                        <div class="faq-text2">{{ faqItem.text2 }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="float-page">
            <el-popover
                placement="top"
                :width="100"
                trigger="hover"
                
            >
                <div class="float-ewm">
                    <img src="@/assets/home/float-ewm.png" />
                    <div class="ewm-text">扫码关注微信公众号</div>
                </div>
                <template #reference>
                    <div class="float" @mouseover="hover = true" @mouseleave="hover = false">
                        <img :src="hover ? '/src/assets/home/ewm-float-hover.png' : '/src/assets/home/ewm-float.png'" class="float-ewm-icon" />
                    </div>
                </template>
            </el-popover>
        </div>
    </div>
</template>
<script setup>
const rowData = ref([
    {src:'/src/assets/home/feature1.png', text1: '多功能筛选器', text2: '全面、详细、多维度分析筛选器，帮助您过滤掉不必要的信息，甄选出核心数据，收藏您的过滤筛选条件，助您快速完成筛选，不错过每一次机会'},
    {src:'/src/assets/home/feature2.png', text1: '实时进攻压力系数', text2: '革命性的创新实时进攻施压算法，综合赛中各维度数据指标，通过核心算法以及AI机器算法，绘制压力系数图表，100%还原真实赛中实际战况'},
    {src:'/src/assets/home/feature3.png', text1: '全球多体育竞技种类', text2: '全球赛事一览无余，除足球比赛以外，还有更多篮球、电竞比赛，掌握体育赛况，查看对线体育就够了'},
    {src:'/src/assets/home/feature4.png', text1: '多平台实时指数对比', text2: '了解全球多平台指数走势，客观反映球队实力、状态以及胜负倾向，通过数据对比，提高比赛胜负预测准确率'},

])
const faqData = ref([
    {src: '/src/assets/home/q1.png', text1: '如何注册/登录？', text2: '找到登录-注册账号，通过邮箱以及验证码即可成为我们的会员，赶快去注册吧！'},
    {src: '/src/assets/home/q2.png', text1: '还不熟悉产品功能，如何学习使用？', text2: '我们提供有视频教程以及使用文档，请联系客服，我们的客服会为您全程解答疑问！'},
    {src: '/src/assets/home/q3.png', text1: '网站数据能否对外提供？', text2: '如果您有需要，请联系客服，告诉我们您的需求，我们会为您提供解决方案！'},
    {src: '/src/assets/home/q4.png', text1: '如何查看所有的比赛数据？', text2: '只要注册成为我们的会员，登录之后就能查看所有比赛数据，未登录情况下只能查看部分赛事数据哦！'},
])
</script>
<style lang='scss' scoped>
.home{
    width: 1200px;
    margin: 0 auto;
    position: relative;
}
.banner{
    margin-top: 24px;
}
.float-page {
    position: fixed;
    top: 80%;
    width: 1450px; /* 设置宽度 */
    left: 50%;
    transform: translate(-50%, -50%); /* 居中对齐 */
    z-index: 1000;
}
.float-ewm{
    text-align: center;
    font-size: 12px;
}
.float{
    float: right;
}
.text-one{
    height: 272px;
    display: flex;
    flex-direction: column;
}
.text1{
    font-size: 32px;
    font-weight: bold;
    margin-top: 80px;
    text-align: center;
}
.text-text2{
    display: flex;
    justify-content: center;
}
.text2{ 
    text-align: center;
    margin-top: 16px;
    font-size: 16px;
    width: 1072px;
}
.feature{
    width: 1200px;
    height: 648px;
    border-radius: 4px;
    background-color: #fff;
}
.feature-title{
    font-size: 40px;
    font-weight: bold;
    margin-left:508px;
    padding-top: 88px;
}
.feature-text1{
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
}
.feature-text2{
    font-size: 16px;
    margin-top: 20px;
}
.row{
    display: flex;
    // margin: 72px 40px 0 40px;
    margin-top: 72px;
}
.row-item{
    width: 241px;
    text-align: center;
    margin: 0 30px;
}
.text-two{
    height: 260px;
    display: flex;
    flex-direction: column;
}
.text3{
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 100px;
}
.text4{
    font-size: 16px;
    text-align: center;
    margin-top: 16px;
}
.about{
    width: 1200px;
    height: 740px;
    border-radius: 4px;
    background-color: #fff;
    margin-top: 90px;
    display: flex;
}
.left{
    padding-top: 120px;
    margin-left: 80px;
}
.left-text1{
    font-size: 40px;
    font-weight: bold;
    
}
.left-text2{
    width: 500px;
    font-size: 16px;
    margin-top: 24px;
}
.time{
    display: flex;
    align-items: center;
    margin-top: 168px;
}
.tel{
    display: flex;
    align-items: center;
    margin-top: 40px;
}
.left-text{
    font-size: 24px;
    margin-left: 16px;
    font-weight: bold;
}
.left-po{
    font-size: 20px;
    margin: 8px 0 0 56px;
}
.left-time{
    display: flex;
    flex-direction: column;
}
.right{
    margin-left: auto;
}
.faq{
    height: 340px;
    width: 1200px;
    display: flex;
    margin-bottom: 100px;
}
.faq-item{
    width: 288px;
    height: 340px;
    border-radius: 4px;
    background-color: #fff;
    margin: 0 8px;
}
.faq-content{
    margin: 32px 0 0 32px;
}
.img-faq{
    margin-top: -20px;
}
.faq-text1{
    font-size: 24px;
    font-weight: bold;
    margin-top: 24px;
    width: 224px;
}
.faq-text2{
    font-size: 16px;
    margin-top: 16px;
    width: 224px;
}
</style>
<style>
.el-carousel__indicator--horizontal .el-carousel__button {
    width: 16px;
    height: 16px;
    background: #000;
    border-radius: 50%;
    margin-left: 10px;
    margin-bottom: 10px;
}
.el-carousel__indicator--horizontal.is-active .el-carousel__button{
    width: 16px;
    height: 16px;
    background: #e92937;
    border-radius: 50%;
}
</style>