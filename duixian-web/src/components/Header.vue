<template>
    <div class="app-header">
        <div class="logo">
            <img src="../assets/logo.png" />
        </div>
        <div class="menu">
            <app-menu />
        </div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.app-header{
    display: flex;
    flex-direction: row;
    height: 70px;
    background-color: #f5f5f5;
}
.logo{
    padding: 15px 0 0 20px;
}
.menu{
    margin-left: auto;
    display: flex;
}


</style>