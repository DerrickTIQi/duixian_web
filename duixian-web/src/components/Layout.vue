<template>
    <div class="app">
        <div class="app-header">
            <app-header />
        </div>
        <div class="app-content">
            <RouterView />
        </div>
        <div class="app-footer">
            <app-footer />
        </div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8f9fa;
}
.app-content{
    background-color: #f8f9fa;
}
.app-footer{
    margin-top: auto;
}
</style>