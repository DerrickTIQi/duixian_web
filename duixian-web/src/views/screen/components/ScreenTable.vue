<template>
    <div class="scdialog">
        <el-dialog v-model="show" class="sctable" >
            <template #title>
                <div class="dialog-title">
                    <div class="title_red"></div>
                    <span class="title_text">{{ dialogTitle }}</span>
                </div>
            </template>
            <el-table  :data="tableData.data" stripe class="screen_table" @row-click="handleRowClick">
                <el-table-column prop="match" label="所属赛事" align="center" width="136px"/>
                <el-table-column prop="time" label="时间" align="center" width="68px"/>
                <el-table-column prop="status" label="状态" align="center" width="108px">
                    <template #default="{row}" >
                        <span style="color: #fff;"> {{ row.status }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="home" label="主场球队" align="right">
                    <template #default="{row}" >
                        <span v-if="row.hred" class="red">{{ row.hred }}</span>
                        <span v-if="row.hyellow" class="yellow">{{ row.hyellow }}</span>
                        <span style="color: #fff;font-size: 12px;margin-right: 5px;">{{row.hwin}}</span>
                        <span> {{ row.home }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="point" label="比分" align="center" width="60px">
                    <template #default="{row}" >
                        <span style="color: #fff;font-weight: 600;"> {{ row.point }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="guest" label="客场球队" align="left">
                    <template #default="{row}" >
                        <span> {{ row.guest }}</span>
                        <span style="color: #fff;font-size: 12px;margin:0 5px;">{{row.gwin}}</span>
                        <span v-if="row.gyellow" class="yellow">{{ row.gyellow }}</span>
                        <span v-if="row.gred" class="red">{{ row.gred }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="half" label="半场" align="center" width="108px"/>
                <el-table-column prop="corner" label="角球" align="center" width="88px"/>
            </el-table>
        </el-dialog>
    </div>
</template>
<script setup>
const show = defineModel({ type: Boolean })
const props = defineProps({
    dialogTitle: String,
})

const tableData = reactive({
    data:[
        {id:'1', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',},
        {id:'2', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', },
        {id:'3', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',},
        {id:'4', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', },
        {id:'5', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',},
        {id:'6', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', },
        {id:'7', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',},
        {id:'8', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', },
        {id:'9', match:'中超', time: '07:00', status:'83\'', home:'北京国安',hwin:'[18]',hred:'2',hyellow:'3', point:'0-1', guest:'成都蓉城',gwin:'[2]',gred:'',gyellow:'2', half:'0-1', corner:'1-6',},
        {id:'10', match:'欧洲冠军杯', time: '07:00', status:'83\'', home:'阿纳波尔',hwin:'[2]',hred:'2',hyellow:'3', point:'2-2', guest:'夏洛特独立队',gwin:'[2]',gred:'3',gyellow:'9', half:'1-1', corner:'3-5', },
    ]
})
const router = useRouter();
const handleRowClick = (row) => {
    router.push(`/Match/${row.id}`)    
}
</script>
<style lang='scss' scoped>

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
.dialog-title{
    display: flex;
    align-items: center;
    height: 50px;
}
.title_red{
    background-color: rgba(255, 59, 48, 1);
    width: 6px;
    height: 18px;
    margin-left: 40px;
}
.title_text{
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
}

</style>
<style>

.scdialog .el-dialog{
    width: 950px;
    background-color: #2c2c2e;
    border-radius: 10px;
}
.scdialog .el-dialog__header .el-dialog__close:hover {
    color: #fff; /* 设置鼠标悬停时的颜色，改为你想要的颜色 */
}
.scdialog .el-dialog__headerbtn:hover{
    color: #fff !important;
    --el-color-primary:normal;
}
.scdialog  .el-table{
    --el-table-header-bg-color: #424243;
}
.scdialog  .el-table th .cell{
    height: 50px;
    line-height: 50px;
    font-weight: 600 !important;
} /* 表头 */
.scdialog  .el-table td{
    height: 55px;
} /* 表格 */
.scdialog  .el-table .cell{
    padding: 0;
    font-weight: normal;
    color: #fff;
    font-size: 14px;
}
.scdialog  .el-table .el-table__cell{
    padding: 0;
}
.scdialog  .el-table .el-table__row{
    background-color: #2c2c2e ;
}
.scdialog  .el-table__row--striped td {

    background-color: rgba(55, 55, 57, 0.5) !important;  /* 偶数行背景颜色 */
}
.scdialog .el-table .el-table__row:hover {
    background-color: #e0e0e0 !important;  /* 鼠标悬停时的颜色 */
}
</style>