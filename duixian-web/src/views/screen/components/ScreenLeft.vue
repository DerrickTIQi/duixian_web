<template>
    <div class="left">
        <div class="menu">
            <div class="menu_text" >
                <div 
                class="menu_text_item" 
                v-for="(item,index) in titleData" 
                :key="item.value"
                @mouseover="hoverIndex = index"
                @mouseleave="hoverIndex = null"
                @click="selectIndex(index)"
                :class="{'active': selectedIndex === index}"
                >
                    <span>{{ item.label }}</span>
                    <div class="underline" v-if="selectedIndex === index || hoverIndex === index"></div>
                </div>
            </div>
            <div class="fenge">
                <img src="@/assets/detail/fengexian.png" />
            </div>
        </div>
        <div class="content">
            <ScreenFilter v-if="selectedIndex === 0"/>
            <ScreenJinxuan v-if="selectedIndex === 1"/>
        </div>

    </div>
</template>
<script setup>
import ScreenJinxuan from './ScreenJinxuan.vue';
import ScreenFilter from './ScreenFilter.vue';
const titleData = ref([
    {label: '筛选器'},
    {label: '精选方案'},
    {label: '我的方案'},
])

const hoverIndex = ref(null) //鼠标悬停时索引
const selectedIndex = ref(1) //点击时索引

const selectIndex = (index) => {
    selectedIndex.value = index
}
</script>
<style lang='scss' scoped>
.menu{
    background-color: rgba(242, 242, 247, 0.5);
    border-radius: 10px 10px 0 0;
    width: 380px;
    height: 46px;
    position: relative;
}
.menu_text{
    display: flex;
    justify-content: space-between;
    margin-left: 42px;
    width: 296px;
    color: #2c2c2e;
    font-size: 16px;
    position: absolute;
    bottom: 8px;
    left: 0;
}
.menu_text_item{
    position: relative;
    cursor: pointer; //手形
}
.menu_text_item span{
    transition: font-size 0.3s, color 0.3s;
}
.menu_text_item .underline{
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ff3b30;
    opacity: 0; //默认不可见
    transition: opacity 0.3s, transform 0.3s;
    transform: scaleX(0); //默认缩放至不可见
}
.menu_text_item.active span{
    font-size: 18px;
    color: #2c2c2e;
    font-weight: 600;
    bottom: 5px;
}
.menu_text_item.active .underline{
    opacity: 1; //选中后保持显示
    transform: scaleX(1); //保持扩展状态
}
.menu_text_item:hover .underline{
    opacity: 1;
    transform: scaleX(1); //悬停时显示横线
}
.fenge {
    position: relative;
    height: 1px;
}
.fenge img {
    position: absolute;
    top: 43px;
    bottom: 0;
    left: 0;
    margin-left: 20px;
}

</style>