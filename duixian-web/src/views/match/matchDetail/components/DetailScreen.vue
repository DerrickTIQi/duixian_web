<template>
    <div class="curve">
        <div class="title">
            <DetailTitle 
            type="big"
            quxianText="筛选预测方案"
            quxianEnText="SCREENING FORECAST SCENATIOS"
            />
        </div>
        <div class="content">
            <div class="content_item" v-for="(item, index) in screenData" :key="index">
                <div class="title">
                    <img src="@/assets/detail/logo.png"/>
                    <span class="title_text">{{ item.title_text }}</span>
                    <img :src="item.src" style="width: 70px;height: 12px;">
                    <div class="title_right">
                        <span class="title_djck">点击查看</span>
                        <img src="@/assets/detail/whiteright.png" />
                    </div>
                </div>
                <div class="main">
                    <span class="main_textone">{{ item.main_textone }}</span>
                    <span class="main_texttwo">{{ item.main_texttwo }}</span>
                </div>
                <div class="bottom">
                    <div class="bottom_item">
                        <span class="bottom_text">今日出单</span>
                        <span class="bottom_num">{{ item.jrcd }}</span>
                    </div>
                    <el-divider direction="vertical" border-color="#c7c7cc" class="custom-divider" />
                    <div class="bottom_item">
                        <span class="bottom_text">近10日出单</span>
                        <span class="bottom_num">{{ item.jtenrcd }}</span>
                    </div>
                    <el-divider direction="vertical" border-color="#c7c7cc" class="custom-divider"/>
                    <div class="bottom_item">
                        <span class="bottom_text">当前出单</span>
                        <span class="bottom_dqcd">{{ item.dqcd }}</span>
                    </div>
                </div>
                <div class="fenge">
                    <img src="@/assets/detail/fengexian.png" />
                </div>
            </div>
            <div class="footer">
                <span>查看更多</span>
                <img src="@/assets/detail/blackright.png"  />
            </div>
        </div>
    </div>
</template>
<script setup>
import DetailTitle from './DetailTitle.vue';

const screenData = ref([
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fivefire.png', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 4},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 4},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/threefire.png', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
])
</script>
<style lang='scss' scoped>
.content{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0px 10px 10px 10px;
    width: 380PX;
    height: 850px;
    padding-top: 20px;
}
.content_item{
    margin: 0 20px 20px 20px;
}
.title{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.title_text{
    margin: 0 10px;
    font-size: 14px;
    color: #2c2c2e;
}
.title_right{
    margin-left: auto;
}
.title_right img{
    position: relative;
    top: 2px;
    left: 2px;
}
.title_djck{
    font-size: 12px;
    color: #8e8e83;
}
.main{
    display: flex;
    flex-direction: column;
}
.main_textone{
    font-size: 16px;
    font-weight: 600;
    color: #2c2c2e;
    margin-top: 10px;
}
.main_texttwo{
    font-size: 12px;
    color: #8e8e83;
    margin-top: 5px;
}
.bottom{
    display:flex;
    align-items: center; /* 垂直居中 */
    margin-top: 12px;
    margin-left: -20px;
}
.bottom_item{
    margin-right: 16px;
    margin-left: 20px;
}
.bottom_text{
    font-size: 12px;
    color: #2c2c2e;
}
.bottom_num{
    color: #ff3b30;
    font-size: 12px;
}

.bottom_dqcd{
    font-size: 16px;
    font-weight: 600;
    background-color: rgba(255, 59, 48, 0.1);
    border-radius: 3px;
    color: #ff3b30;
    padding: 0 3px 0 3px;
    border: 1px solid rgba(255, 59, 48, 0.2);
    margin-left: 4px;
    position: relative; /* 添加相对定位 */
    top: 4px;
}
.fenge {
    position: relative;
    height: 23px;
}
.fenge img {
    position: absolute;
    bottom: 0;
    left: 0;
}
.custom-divider {
    border-color: #c7c7cc !important; /* 更改分割线的颜色 */
}
.footer{
    font-size: 14px;
    color: #2c2c2e;
    display: flex;
    justify-content: center; /* 水平居中 */
}
.footer img{
    height: 13px;
    position: relative;
    top: 2px;
    left: 2px;
}
</style>