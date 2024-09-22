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
}
.app-footer{
    margin-top: auto;
}
</style>