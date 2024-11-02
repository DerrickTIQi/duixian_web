<template>
    <div class="letballgo">
      <div class="title_name">让球</div>
      <div class="table_conent">
        <el-row class="row_1">
          <el-col :span="12">主队</el-col>
          <el-col :span="12">客队</el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球场次</el-col>
              <el-col class="borderrig" :span="8">3</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球胜率</el-col>
              <el-col class="borderrig" :span="8">48%</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球胜率</el-col>
              <el-col :span="8">48%</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球以上场次</el-col>
              <el-col class="borderrig" :span="8">2</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球以上场次</el-col>
              <el-col :span="8">2</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球以上胜率</el-col>
              <el-col class="borderrig" :span="8">35%</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">净胜 1 球以上胜率</el-col>
              <el-col :span="8">35%</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">赢得初盘场次</el-col>
              <el-col class="borderrig" :span="8">5</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">赢得初盘场次</el-col>
              <el-col :span="8">5</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">赢得初盘胜率</el-col>
              <el-col class="borderrig" :span="8">58%</el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">赢得初盘胜率</el-col>
              <el-col :span="8">58%</el-col>
            </el-row>
          </el-col>
        </el-row>
        
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style lang="scss" scoped>
  .letballgo {
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
    
    height: 198px;
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