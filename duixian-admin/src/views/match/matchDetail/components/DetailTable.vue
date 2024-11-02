<template>
    <div class="detable">
        <el-table 
        class="detali_table" 
        :data="tableData" 
        :header-cell-style="{ 
            background: '#f5f5f5',
            height: '31px' 
        }" 
        :cell-style="{
            height: '31px'
        }" 
        style="width: 100%">
            <el-table-column prop="lx" label="" width="100" align="center"/>
            <el-table-column label="让球"  align="center">
                <template #default="scope">
                    <div class="cell-content">
                        <div class="cell-item">{{ scope.row.rq.a }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.rq.b }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.rq.c }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="胜负" align="center">
                <template #default="scope">
                    <div class="cell-content">
                        <div class="cell-item">{{ scope.row.sf.a }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.sf.b }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.sf.c }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="总进球" align="center">
                <template #default="scope">
                    <div class="cell-content">
                        <div class="cell-item">{{ scope.row.zjq.a }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.zjq.b }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.zjq.c }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角球" align="center">
                <template #default="scope">
                    <div class="cell-content">
                        <div class="cell-item">{{ scope.row.jq.a }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.jq.b }}</div>
                        <el-divider direction="vertical" />
                        <div class="cell-item">{{ scope.row.jq.c }}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
   
</template>
<script setup>
const tableData = [
  {lx: '赛中', rq: {a:'1.22',b:'0.13',c:'1.75'}, sf: {a:'1.22',b:'0.13',c:'1.75'}, zjq: {a:'1.22',b:'0.13',c:'1.75'}, jq: {a:'1.22',b:'0.13',c:'1.75'}},
  {lx: '即时', rq: {a:'1.22',b:'0.13',c:'1.75'}, sf: {a:'1.22',b:'0.13',c:'1.75'}, zjq: {a:'1.22',b:'0.13',c:'1.75'}, jq: {a:'1.22',b:'0.13',c:'1.75'}},
  {lx: '初始', rq: {a:'1.22',b:'0.13',c:'1.75'}, sf: {a:'1.22',b:'0.13',c:'1.75'}, zjq: {a:'1.22',b:'0.13',c:'1.75'}, jq: {a:'1.22',b:'0.13',c:'1.75'}},
]
</script>
<style lang='scss' scoped>
.detali_table{
    border: 1px solid #e8e8e8;
    ::v-deep .el-table__cell {
        border-right: 1px solid #e8e8e8;
        border-bottom: 1px solid #e8e8e8;
    }
}
.cell-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cell-item {
    flex: 1;
    text-align: center;
}

</style>
<style >
.detable .el-table .el-table__cell{
    padding: 0;
}
.detable .el-table .cell{
    padding: 0;
    font-weight: normal;
    color: rgba(142, 142, 147, 1);
    font-size: 12px;
}
</style>