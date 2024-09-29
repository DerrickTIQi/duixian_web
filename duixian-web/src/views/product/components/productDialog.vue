<template>
    <div class="dialog">
        <el-dialog v-model="show"  :align-center="true" class="prodialog">
            <div class="prodialog-content">
                <div class="dialog-text">关注微信公众号，咨询客服</div>
                <div class="ewm">
                    <img src="@/assets/product/ewm.png" />
                </div>
                <div class="tishi">请使用手机微信扫一扫</div>
            </div>
            
        </el-dialog>
    </div>
</template>
<script setup>
const show = defineModel({ type: Boolean })
const close = ref(false)
</script>
<style lang='scss' scoped>
.prodialog-content{
    width: 500px;
    height: 496px;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 64px;
}
.dialog-text{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #000;
}
.ewm{
    width: 220px;
    height: 220px;
    border-radius: 8px;
    border: solid 1px #d9d9d9;
    margin-top: 40px;
    text-align: center;
    margin-left: 140px;
}
.ewm img{
    margin-top: 10px;
}
.tishi{
    font-size: 14px;
    margin-top: 16px;
    text-align: center;
    opacity: 0.5;
}
</style>
<style >
.dialog .el-dialog{
    --el-dialog-width: 500px;
}
.dialog .el-dialog__headerbtn .el-dialog__close{
    width: 24px !important;
    height: 24px !important;
}
.dialog .el-dialog__headerbtn .el-dialog__close:hover{
    color: #e92937;
}
.dialog .el-dialog__headerbtn:hover{
    color: #e92937 !important;
    --el-color-primary:normal;
}
.dialog .el-icon svg{
    width: 2em ;
    height: 2em ;
}


</style>