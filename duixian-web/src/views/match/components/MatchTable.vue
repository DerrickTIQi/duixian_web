<template>
    <div class="match_table">
        <el-table :data="tableData.data" stripe style="width: 100%"  @row-click="handleRowClick">
            <el-table-column prop="match" label="所属赛事" align="center" width="136px"/>
            <el-table-column prop="time" label="时间" align="center" width="68px"/>
            <el-table-column prop="status" label="状态" align="center" width="108px">
                <template #default="{row}" >
                    <span style="color: #ff3b30;"> {{ row.status }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="home" label="主场球队" align="right">
                <template #default="{row}" >
                    <span v-if="row.hred" class="red">{{ row.hred }}</span>
                    <span v-if="row.hyellow" class="yellow">{{ row.hyellow }}</span>
                    <span style="color: #8e8e93;font-size: 12px;margin-right: 5px;">{{row.hwin}}</span>
                    <span> {{ row.home }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="point" label="比分" align="center" width="60px">
                <template #default="{row}" >
                    <span style="color: #ff3b30;font-weight: 600;"> {{ row.point }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="guest" label="客场球队" align="left">
                <template #default="{row}" >
                    <span> {{ row.guest }}</span>
                    <span style="color: #8e8e93;font-size: 12px;margin:0 5px;">{{row.gwin}}</span>
                    <span v-if="row.gyellow" class="yellow">{{ row.gyellow }}</span>
                    <span v-if="row.gred" class="red">{{ row.gred }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="half" label="半场" align="center" width="108px"/>
            <el-table-column prop="corner" label="角球" align="center" width="88px"/>
            <el-table-column prop="trend" label="初始走势" align="center" width="142px">
                <template #default="{row}" >
                    <div style="font-size: 12px;">
                        <span class="trtext">{{ row.trend.a }}</span>
                        <span class="trtext">{{ row.trend.b }}</span>
                        <span class="trtext">{{ row.trend.c }}</span>
                        <br>
                        <span class="trtext">{{ row.trend.d }}</span>
                        <span class="trtext">{{ row.trend.e }}</span>
                        <span class="trtext">{{ row.trend.f }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  label="功能" align="center" width="108px">
                <template #default="{row}">
                    <div class="function">
                        <div @click="(event) => toggleStart(row, event)" class="icon">
                            <img :src="row.startActive ? '/src/assets/table/start_red.png' : '/src/assets/table/start.png'" />
                        </div>
                        <div @click="(event) => toggleTop(row, event)" class="icon">
                            <img :src="row.topActive ? '/src/assets/table/top_red.png' : '/src/assets/table/top.png'" />
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
const router = useRouter();
const toggleStart = (row,event) => {
    event.stopPropagation();  // 阻止事件冒泡
    row.startActive = !row.startActive;
}


const toggleTop = (row,event) => {
    event.stopPropagation();  // 阻止事件冒泡
    row.topActive = !row.topActive;
}

const tableData = reactive({
    data:[
        {id:'1', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'2', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'3', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'4', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'5', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'6', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'7', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'8', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'9', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
        {id:'10', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', trend:{a:'1.1',b:'2.5',c:'1.8',d:'1.2',e:'0.5',f:'1.9'},startActive:false,topActive:false},
    ]
})


const handleRowClick = (row) => {
    router.push(`/Match/${row.id}`).then(() => {
        window.location.reload();  // 刷新页面
    })      
}

</script>
<style lang='scss' scoped>
.el-table{
    --el-table-header-bg-color: #f2f2f7;
    border-radius: 5px;
}
.red{
    background-color: rgba(255, 59, 48, 1);
    border-radius: 3px;
    color: #fff;
    padding: 0 2px 2px 4px;
    margin-right: 5px;
}
.yellow{
    background-color: rgba(255, 204, 0, 1);
    border-radius: 3px;
    color: #fff;
    padding: 0 2px 2px 4px;
    margin-right: 5px;
}
.trtext{
    margin: 0 11px;
}
.function{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
.icon{
    margin: 0 5px;
}
</style>
<style >
.match_table .el-table th{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
} /* 表头 */
.match_table .el-table td{
    height: 55px;
} /* 表格 */
.match_table .el-table .cell{
    padding: 0;
    font-weight: normal;
    color: #2c2c2e;
    font-size: 14px;
}
.match_table .el-table .el-table__cell{
    padding: 0;
}
.match_table .el-table__row--striped td {
  background-color: rgba(242, 242, 247, 0.5) !important;  /* 偶数行背景颜色 */
}

.match_table .el-table .el-table__row:hover {
  background-color: #e0e0e0 !important;  /* 鼠标悬停时的颜色 */
}

</style>

