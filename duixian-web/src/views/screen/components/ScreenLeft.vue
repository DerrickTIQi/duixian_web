<template>
    <div class="left">
        <div class="menu">
            <div class="menu_text" >
                <div 
                class="menu_text_item" 
                v-for="(item,index) in titleData" 
                :key="item"
                @mouseover="hoverIndex = index"
                @mouseleave="hoverIndex = null"
                @click="selectIndex(index)"
                :class="{'active': selectedIndex === index}"
                >
                    <span>{{ item }}</span>
                    <!-- 筛选器和精选方案项中显示的span -->
                    <span v-if="index === 0 && count" class="title-span">{{ count }}</span> <!-- 筛选器的内容 -->
                    <span v-if="index === 1" class="title-span">{{ myPlansData.length }}</span> <!-- 精选方案的内容 -->
                    <div class="underline" v-if="selectedIndex === index || hoverIndex === index"></div>
                </div>
            </div>
            <div class="fenge">
                <img src="@/assets/detail/fengexian.png" />
            </div>
        </div>
        <div class="content">
            <ScreenFilter v-if="selectedIndex === 0" :selectedIndex="selectedIndex" @update:selectedIndex="selectedIndex = $event" @updateStart="Start"/>
            <ScreenJinxuan v-if="selectedIndex === 1 && screenData " :data="screenData" @updatePlans="updatePlan" :selectedIndex="selectedIndex"/>
            <ScreenMy v-if="selectedIndex === 2 " :data="mainData" :selectedIndex="selectedIndex"  @update:selectedIndex="selectedIndex = $event" />
        </div>

    </div>
</template>
<script setup>
import ScreenJinxuan from './ScreenJinxuan.vue';
import ScreenFilter from './ScreenFilter.vue';
import ScreenMy from './ScreenMy.vue';
import { myPlans, Plans } from '../../../api/screen';
const props = defineProps({
    count: Int32Array,
})
const route = useRoute();
const emit = defineEmits(['startStatus'])
const titleData =["筛选器", "精选方案", "我的方案"]
// 计算用户角色
const userStore = useUserStore();
const userRole = computed(() => userStore.roles);
const hoverIndex = ref(null) //鼠标悬停时索引
const selectedIndex = ref(route.query.activeIndex ? parseInt(route.query.activeIndex) : 1) //点击时索引
const screenData = ref([])  //精选方案数据
const mainData = ref([])  //我的方案数据
// if(userRole.value !== 'tourist'){
//     Plans().then((res) => {
//         screenData.value = res;
//     });
// }
const startStatus = ref() //收藏状态
const Start = (item) => {
    startStatus.value = item
    emit('startStatus',startStatus)
    
}

const myPlansData = ref([])
const updatePlan = (data) => {
    myPlansData.value = data
}
const selectIndex = (index) => {
    selectedIndex.value = index
     // 根据点击的索引调用不同的接口
     if (index === 1 && userRole.value !== 'tourist') {
        // Plans().then((res) => {
        //     screenData.value = res;
        // });
    } else if (index === 2 && userRole.value !== 'tourist') {
        // myPlans().then((res) => {
        //     mainData.value = res;
        // });
    }
}
</script>
<style lang='scss' scoped>
.title-span{
    background-color: #ff3b30;
    font-weight: normal !important;
    color: #fff !important;
    border-radius: 15px;
    padding: 0 5px;
    margin-left: 5px;
}
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
    margin-left: 30px;
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