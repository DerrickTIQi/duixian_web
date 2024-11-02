<template>
    <div class="sizeballs">
      <div class="title_name">大小球</div>
      <div class="table_conent">
        <el-row class="row_1">
          <el-col :span="12">初盘</el-col>
          <el-col :span="12">3球</el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">大于场次</el-col>
              <el-col class="borderrig" :span="12">3</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">大于场次</el-col>
              <el-col :span="12">3</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">大于胜率</el-col>
              <el-col class="borderrig" :span="12">48%</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">大于胜率</el-col>
              <el-col :span="12">48%</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">小于场次</el-col>
              <el-col class="borderrig" :span="12">2</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">小于场次</el-col>
              <el-col :span="12">2</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">小于胜率</el-col>
              <el-col class="borderrig" :span="12">35%</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="12">小于胜率</el-col>
              <el-col :span="12">35%</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style lang="scss" scoped>
  .sizeballs {
    display: flex;
    flex-direction: column;
    margin-top: 4px;
  }
  .title_name {
    font-size: 12px;
    font-weight: 600;
    color: #000;
    opacity: 0.7;
  }
  .table_conent {
    border: solid 1px #ebebeb;
    height: 142px;
    margin-top: 4px;
  
    .row_1 {
      background-color: #fafafa;
      height: 28px;
  
      .el-col {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #000;
        font-weight: 600;
      }
  
      .el-col:not(:last-child) {
        border-right: 1px solid #ebebeb;
      }
    }
    .row_2:not(:last-child) {
      border-bottom: 1px solid #ebebeb;
    }
  
    .row_2 {
      height: 28px;
  
      .el-col {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #000;
      }
  
      .borderrig {
        border-right: 1px solid #ebebeb;
      }
    }
  }
  </style>