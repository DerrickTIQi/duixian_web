<template>
    <div class="app">
        <div class="app-header">
            <app-header />
        </div>
        <div class="app-content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.app {
    // min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
}
.app-header{
    align-items: center;
}
.app-content{
    padding: 16px;
    background-color: #f8f9fa;
}
.app-footer{
    margin-top: auto;
}
</style>