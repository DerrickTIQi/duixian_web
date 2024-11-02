<template>
    <div class="filter-table">
        <el-scrollbar class="table-scroll">
            <el-table
            :data="data"
            style="width: 100%"
            class="table-f"
            >
            <el-table-column prop="time" label="比赛时间" align="left" width="90px">
                <template #default="{ row }">
                    <a :href="getRowLink(row)" class="row-link">
                        <span style="font-weight: normal !important;">{{ row.odds_datetime?.date_cut }}</span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="match" label="联赛" align="left" width="90px">
                <template #default="{ row}">
                    <a :href="getRowLink(row)" class="row-link">
                        <span style="font-weight: normal !important;"  class="match-text" :title="row.NCN?.LEAGUE">{{ row.NCN?.LEAGUE }}</span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="home" label="主队" align="right" width="120px">
                <template #default="{ row }">
                    <a :href="getRowLink(row)" class="row-link">
                        <span style="font-weight: normal !important;" class="match-text"> {{ row.NCN?.TEAM_H }}</span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="point" label="比分" align="center" width="55px" >
                <template #default="{ row }">
                    <a :href="getRowLink(row)" class="row-link">
                        <span style="font-weight: bold;color: #e92937;">
                            {{ row.NCN?.SCORE }}
                        </span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="guest" label="客队" align="left" width="120px">
                <template #default="{ row }">
                    <a :href="getRowLink(row)" class="row-link">
                        <span  style="font-weight: normal !important;" class="match-text"> {{ row.NCN?.TEAM_C }}</span>
                    </a>
                </template>
            </el-table-column>
            <el-table-column  prop="half" label="半场" align="center" >
                <template #default="{ row }">
                    <a :href="getRowLink(row)" class="row-link">
                        <span style="font-weight: bold; color: #e92937;">
                            {{ row.NCN?.["H:SCORE"] }}
                        </span>
                    </a>
                </template>
            </el-table-column>
        </el-table>
        <app-pagination 
        :total="total" 
        :current-page="currentPage" 
        :page-size="pageSize"
        @update:currentPage="emit('update:currentPage', $event)"
        @update:pageSize="emit('update:pageSize', $event)"/>
        </el-scrollbar>
    </div>
</template>
<script setup>
const props = defineProps({
    data: Array,
    total: Number
})
const emit = defineEmits(['update:currentPage', 'update:pageSize'])
const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 每页条目数
const getRowLink = (row) =>{
    return `/match/live/${row.KEY}`

}
</script>
<style lang='scss' scoped>
.table-scroll{
    height: 100%;
}
.filter-table{
    width: calc(50% - 100px);
    height: calc(100vh - 175px);
    margin-left: 16px;
    border: solid 1px #ebebeb;
}
.el-table {
  --el-table-header-bg-color: #f5f5f5;
}
.match-text{
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;      
    -webkit-line-clamp: 2; // 限制显示两行 
}
a{
    text-decoration: none; //去下划线
}
.row-link{
    color: #000000;
    font-size: 12px;
    font-weight: 0;
}
</style>
<style >
.filter-table .el-table th {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  
} /* 表头 */
.filter-table .el-table td {
  height: 56px;
  border-bottom: 1px solid #ebebeb;
} /* 表格 */
.filter-table .el-table .cell {
  padding: 0;
  font-weight: normal;
  color: #000;
  font-size: 12px;
  margin-left: 16px;
  font-weight: bold;
}
.filter-table .el-table .el-table__cell {
  padding: 0;
}

.filter-table .el-table .el-table__row:hover {
  background-color: #e0e0e0 !important; /* 鼠标悬停时的颜色 */
}
</style>