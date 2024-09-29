<template>
    <div class="filter" :style="{ height: filterHeight }">
        <div class="top" :style="{ height: topHeight }">
            <div class="collect">
                <img src="@/assets/table/start.png" />
                <span class="collect-text">我的收藏</span>
            </div>
            <div class="fenge"></div>
            <div class="leagues">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="所有联赛" name="allLeagues" :style="{backgroudColor: 'rgba(242, 242, 247, 0.5)'}">
                        <div class="league-list">
                            <div v-for="(league, index) in leagues" :key="index">
                                <div class="title">
                                    <span class="title-text">{{ league.title }}</span>
                                </div>
                                <div class="content">
                                    <span 
                                    class="content-text" 
                                    v-for="(item, idx) in league.contents" 
                                    :key="idx"
                                    :class="{'selected' : isSelected(league.title, item)}"
                                    @click="toggleSelection(league.title, item)">{{ item }}</span>  
                                    <!-- 根据当前是否被选中来动态加载selected；点击传递当前联赛标题和内容 -->
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

        </div>
        <div class="main-text">赛中指标</div>
        <div class="szzb" >
            <app-selectInputItem 
            :options="dropdownData.szzb.options1"
            v-model="dropdownData.szzb.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.szzb.options2"
            :placeholder="dropdownData.szzb.placeholder1"/>
            <app-selectInputItem 
            :options="dropdownData.szzb.options3"
            v-model="dropdownData.szzb.defaultValue"/>
        </div>
        <div class="main-text">全场压力系数</div>
        <div class="qcylxs">
            <app-selectInputItem 
            :options="dropdownData.qcylxs.options1"
            :placeholder="dropdownData.qcylxs.placeholder1"/>
            <app-selectInputItem 
            :options="dropdownData.qcylxs.options2"
            :placeholder="dropdownData.qcylxs.placeholder2"/>
        </div>
        <div class="main-text">赛中事件</div>
        <div class="szsj">
            <app-selectInputItem 
            :options="dropdownData.szsj.options1"
            v-model="dropdownData.szsj.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.szsj.options2"
            v-model="dropdownData.szsj.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.szsj.options3"
            :placeholder="dropdownData.szsj.placeholder"/>
        </div>
        <div class="main-text">射门</div>
        <div class="sm">
            <app-selectInputItem 
            :options="dropdownData.sm.options1"
            v-model="dropdownData.sm.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.sm.options1"
            v-model="dropdownData.sm.defaultValue"/>
        </div>
        <div class="main-text">罚牌</div>
        <div class="fp">
            <app-selectInputItem
            :options="dropdownData.fp.options1"
            v-model="dropdownData.fp.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.fp.options1"
            v-model="dropdownData.fp.defaultValue"/>
        </div>
        <div class="main-text">指数</div>
        <div class="zs">
            <app-selectItem 
            :options="dropdownData.zs.options1"
            v-model="dropdownData.zs.defaultValue"/>
            <app-selectItem
            :options="dropdownData.zs.options2"
            v-model="dropdownData.zs.defaultValue"/>
            <app-selectItem 
            :options="dropdownData.zs.options3"
            v-model="dropdownData.zs.defaultValue"/>
            <app-selectItem 
            :options="dropdownData.zs.options4"
            v-model="dropdownData.zs.defaultValue"/>
            <app-selectInputItem 
            :options="dropdownData.zs.options5"
            v-model="dropdownData.zs.defaultValue"/>

        </div>

        <div class="bottom">
            <div class="buttone">
                <div class="butt1">重置</div>
                <div class="butt2">完成</div>
            </div>
            <div class="butttwo">
                <div class="butt3">保存新方案</div>
            </div>
        </div>
    </div>
</template>
<script setup>
const activeName = ref('');
const leagues = ref([
    { title: '联赛A', contents: ['内容1', '内容2', '内容3'] },
    { title: '联赛B', contents: ['内容1', '内容2'] },
    { title: '联赛C', contents: ['内容1'] },
    { title: '联赛D', contents: ['内容1', '内容2'] },
    { title: '联赛E', contents: ['内容1'] },
    { title: '联赛F', contents: ['内容1', '内容2'] },
    { title: '联赛G', contents: ['内容1'] },
    { title: '联赛H', contents: ['内容1', '内容2'] },
    { title: '联赛I', contents: ['内容1'] },
])
//存储选中的联赛内容，标题为key，内容数组为value
const selectedItems = ref([])
const toggleSelection = (leagueTitle, item) => {
    //首先检查selectedItems中是否有当前比赛的key，没有初始就为空
    if(!selectedItems.value[leagueTitle]){
        selectedItems.value[leagueTitle] = []
    }
    //使用indexOf找当前项的索引，如果未找到就添加，如果找到就移除
    const index = selectedItems.value[leagueTitle].indexOf(item)
    if(index === -1){
        selectedItems.value[leagueTitle].push(item)
    }else{
        selectedItems.value[leagueTitle].splice(index, 1)
    }
}
//检查当前内容项是否被选中，
const isSelected = (leagueTitle, item) => {
    return selectedItems.value[leagueTitle] && selectedItems.value[leagueTitle].includes(item)
}
const topHeight = computed(() => (activeName.value ? '500px' : '100px'))
const filterHeight = computed(() => (activeName.value ? '2000px' : '1600px'))

const dropdownData = ref({
  szzb: {
    options1: [
      { value: '1', label: '总体 压力' },
      { value: '2', label: '任意一队 压力' },
      { value: '3', label: '主队 压力' },
      { value: '4', label: '客队 压力' },
      { value: '5', label: '两队差 压力' },
      { value: '6', label: '两队同时 压力' },
    ],
    options2: [
      { value: '1', label: '任意一队 控球率' },
      { value: '2', label: '主队 控球率' },
      { value: '3', label: '客队 控球率' },
      { value: '4', label: '两队差 控球率' },
      { value: '5', label: '两队同时 控球率' },
    ],
    options3: [
      { value: '1', label: '比赛进行时间' }
    ],
    defaultValue: '1',
    placeholder1: '控球率',
  },
  qcylxs: {
    options1: [
      { value: '1', label: '请输入' },
    ],
    options2: [
      { value: '1', label: '请输入' },
    ],
    defaultValue: '1',
    placeholder1: '最近10分钟压力值',
    placeholder2: '全场平均',
  },
  szsj: {
    options1: [
      { value: '1', label: '总体 进球' },
      { value: '2', label: '任意一队 进球' },
      { value: '3', label: '主队 进球' },
      { value: '4', label: '客队 进球' },
      { value: '5', label: '两队差 进球' },
      { value: '6', label: '两队同时 进球' },
    ],
    options2: [
      { value: '1', label: '总体 危险进攻' },
      { value: '2', label: '任意一队 危险进攻' },
      { value: '3', label: '主队 危险进攻' },
      { value: '4', label: '客队 危险进攻' },
      { value: '5', label: '两队差 危险进攻' },
      { value: '6', label: '两队同时 危险进攻' },
    ],
    options3: [
      { value: '1', label: '任意一队 角球' },
      { value: '2', label: '主队 角球' },
      { value: '3', label: '客队 角球' },
      { value: '4', label: '两队差 角球' },
      { value: '5', label: '两队同时 角球' },
    ],
    defaultValue: '1',
    placeholder: '角球',
  },
  sm: {
    options1: [
    { value: '1', label: '总体 射正' },
      { value: '2', label: '任意一队 射正' },
      { value: '3', label: '主队 射正' },
      { value: '4', label: '客队 射正' },
      { value: '5', label: '两队差 射正' },
      { value: '6', label: '两队同时 射正' },
    ],
    options2: [
    { value: '1', label: '总体 射偏' },
      { value: '2', label: '任意一队 射偏' },
      { value: '3', label: '主队 射偏' },
      { value: '4', label: '客队 射偏' },
      { value: '5', label: '两队差 射偏' },
      { value: '6', label: '两队同时 射偏' },
    ],
    defaultValue: '1',
  },
  fp: {
    options1: [
    { value: '1', label: '总体 红牌' },
      { value: '2', label: '任意一队 红牌' },
      { value: '3', label: '主队 红牌' },
      { value: '4', label: '客队 红牌' },
      { value: '5', label: '两队差 红牌' },
      { value: '6', label: '两队同时 红牌' },
    ],
    options2: [
    { value: '1', label: '总体 黄牌' },
      { value: '2', label: '任意一队 黄牌' },
      { value: '3', label: '主队 黄牌' },
      { value: '4', label: '客队 黄牌' },
      { value: '5', label: '两队差 黄牌' },
      { value: '6', label: '两队同时 黄牌' },
    ],
    defaultValue: '1',
  },
  zs: {
    options1: [
      { value: '1', label: '初始 指数' },
      { value: '2', label: '赛中 指数' },
    ],
    options2: [
      { value: '1', label: '36*' },
    ],
    options3: [
      { value: '1', label: '1X2(全场)' },
    ],
    options4: [
      { value: '1', label: '主队' },
      { value: '2', label: '客队' },
      { value: '3', label: '平局' },
    ],
    options5: [
      { value: '1', label: '输入指标值' },
    ],
    defaultValue: '1',
  },
  
})
</script>
<style lang='scss' scoped>
.filter{
    background-color: rgba(242, 242, 247, 0.5);
    width: 380px;
    padding-top: 20px;
}
.collect{
    height: 35px;
    margin: 10px 0 0 10px;
}
.collect-text{
    margin-left: 5px;
}
.fenge{
    width: 100%;
    border: solid 0.5px #CCCCCC;
}
.top{
    width: 340px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
    transition: height 0.3s ease;
}
.league-list {
    margin-left: 20px;
    font-size: 16px;
    max-height: 400px; 
    overflow-y: auto;
}
.title {
    margin-top: 10px;
}
.title-text {
    font-weight: bold;
}
.content {
    display: flex;
    flex-direction: column;
}
.content-text {
    margin-left: 20px;
    font-size: 14px;
    cursor: pointer;
}
.el-collapse{
    
    --el-collapse-header-bg-color: normal;
    --el-collapse-content-bg-color: normal;
}
:deep(.el-collapse-item__header){
    font-size: 16px;
    font-family: AlibabaPuHuiTi_2_55;
    margin-left: 20px;
}
:deep(.el-collapse-item__arrow){
    margin-right: 25px;
}
.main-text{
    margin: 20px 0 20px 20px;
}
.szzb{
    width: 340px;
    height: 170px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
    
}
.qcylxs{
    width: 340px;
    height: 120px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.szsj{
    width: 340px;
    height: 170px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.sm{
    width: 340px;
    height: 120px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.fp{
    width: 340px;
    height: 120px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.zs{
    width: 340px;
    height: 270px;
    margin-left: 20px;
    border-radius: 10px;
    border: solid 1px #CCCCCC;
}
.selected{
    color: #ff3b30;
}
.buttone{
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
.butt1{
    width: 170px;
    height: 40px;
    border: solid 1px #ff3b30;
    border-radius: 30px;
    color: #ff3b30;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
.butt2{
    width: 170px;
    height: 40px;
    background-color: #ff3b30;
    border-radius: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.butttwo{
    display: flex;
    margin-top: 20px;
    justify-content: center;
}
.butt3{
    width: 350px;
    height: 40px;
    background-color: #ff3b30;
    border-radius: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>