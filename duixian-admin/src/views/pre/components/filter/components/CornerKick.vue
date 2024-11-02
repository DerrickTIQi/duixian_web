<template>
    <div class="sizeballs">
      <div class="title_name">角球</div>
      <div class="table_conent">
        <el-row class="row_1">
          <el-col :span="10">大小</el-col>
          <el-col :span="14">让球</el-col>
        </el-row>
        <el-row class="row_2">
          <el-col :span="10" style="display: flex;flex-direction: column;">
            <el-row class="borderbot" style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16" style="text-align: center;">总体超过初盘角球<br/>盘口场次</el-col>
              <el-col class="borderrig" :span="8">3</el-col>
            </el-row>
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16" style="text-align: center;">总体超过初盘角球<br/>盘口胜率</el-col>
              <el-col class="borderrig" :span="8">64%</el-col>
            </el-row>
          </el-col>
          <el-col :span="14" style="display: flex;flex-direction: column;">
            <el-row class="borderbot" style="width: 100%; height: 28px;">
              <el-col class="borderrig" :span="16">主队赢的初盘让球盘口场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
            <el-row class="borderbot" style="width: 100%; height: 28px;">
              <el-col class="borderrig" :span="16">主队赢的初盘让球盘口场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
            <el-row class="borderbot" style="width: 100%; height: 28px;">
              <el-col class="borderrig" :span="16">主队赢的初盘让球盘口场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
            <el-row style="width: 100%; height: 28px;">
              <el-col class="borderrig" :span="16">主队赢的初盘让球盘口场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- <el-row :span="14" class="row_2">
          <el-col :span="24">
            <el-row style="width: 100%; height: 100%">
              <el-col class="borderrig" :span="16">主队赢的初盘让球盘口场次</el-col>
              <el-col :span="8">3</el-col>
            </el-row>
          </el-col>
        </el-row> -->
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
      
      display: flex;
      justify-content: end;
  
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
      .borderbot {
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
  </style>