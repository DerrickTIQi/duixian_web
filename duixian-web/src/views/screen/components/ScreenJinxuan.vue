<template>
    <div>
        <div class="content_item" v-for="(item, index) in screenData" :key="index">
            <div class="title">
                <img src="@/assets/detail/logo.png"/>
                <span class="title_text">{{ item.title_text }}</span>
                <img :src="item.src" style="width: 70px;height: 12px;">
                <div class="title_right">
                    <div class="bmf" v-if="item.money">
                        <img src="@/assets/detail/money.png" />
                        <div class="money">
                            {{ item.money }}
                            <span class="money_text">金币</span>
                        </div>
                    </div>
                    <div class="mf" v-else>
                        <img src="@/assets/detail/xsmf.png"/>
                    </div>
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
            <div class="caozuo">
                <div class="fuhe" @click="conformClick(item.main_textone,index)">
                    <span>符合方案的近10场比赛</span>
                    <img src="@/assets/detail/blackright.png" />
                </div>
                <div class="tianjia" >
                    <button class="butt">添加方案</button>
                </div>
            </div>
            <div class="fengetwo">
                <img src="@/assets/detail/fengexian.png" />
            </div>
        </div>
        <div class="footer">
            <span>查看更多</span>
            <img src="@/assets/detail/blackright.png"  />
        </div>


        <ScreenTable v-model="show" :index="selectedIndex" :dialogTitle="dialogTitle"/>
    </div>
</template>
<script setup>
import ScreenTable from './ScreenTable.vue';
const screenData = ref([
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fivefire.png', money: '792', main_textone: '全场破蛋', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 4},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', money: '', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', money: '792', main_textone: '全场破蛋', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 4},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/fourfire.png', money: '', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
    {title_text: '红DAN如喝水', src: '/src/assets/detail/threefire.png', money: '', main_textone: '状态不错，信心出击，红红红红红红！', main_texttwo: '通过更重高数计算得出的结果，精准高效', jrcd: 9, jtenrcd: 69, dqcd: 28},
])
const show = ref(false)
const selectedIndex = ref(null)
const dialogTitle = ref('')
const conformClick = (mainTextOne, index) => {
    dialogTitle.value = mainTextOne
    selectedIndex.value = index;
    show.value = true
}
</script>
<style lang='scss' scoped>
.content_item{
    background-color: rgba(242, 242, 247, 0.5);
    width: 380px;
    height: 211px;
    box-sizing: border-box;
    padding: 20px 20px 0 20px; // 使padding包含在height内
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
.bmf{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.bmf img{
    width: 14px;
    height: 14px;
    margin-top: -5px;
}
.money{
    margin-left: 5px;
    color: #ff3b30;
    font-size: 18px;
    font-weight: 600;
}
.money_text{
    font-size: 12px;
    font-weight: 0;
    margin-left: -5px;
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
.custom-divider {
    border-color: #c7c7cc !important; /* 更改分割线的颜色 */
}
.footer{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 0 0 10px 10px;
    width: 380px;
    height: 40px;
    padding-top: 20px;
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

.caozuo{
    display: flex;
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
}
.fuhe{
    font-size: 12px;
    color: #2e2e2c;
    cursor: pointer; //手形
    display: flex;
}
.fuhe img{
    height: 11px;
    position: relative;
    top: 3px;
}
.butt{
    border-radius: 5px;
    height: 32px;
    border: 1px solid #ff3b30;
    margin-left: 119px;
    width: 90px;
    color: #ff3b30;
    background-color: rgba(242, 242, 247, 0.5);
    font-size: 14px;
}
</style>