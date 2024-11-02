<template>
    <app-layout>
        <div class="pre">
            <div class="menu">
                <Amenu />
            </div>
            <div class="content">
                <Filter v-if="route.path === '/pre/filter'"/>
                <Recommend v-if="route.path === '/pre/recommend'"/>
                <Follow v-if="route.path === '/pre/follow'"/>
                <Save v-if="route.path === '/pre/save'"/>
            </div>
        </div>
    </app-layout>
</template>
<script setup>
import Amenu from './components/Amenu.vue';
import Filter from './components/filter/index.vue'
import Recommend from './components/recommend/index.vue'
import Follow from './components/follow/index.vue'
import Save from './components/save/index.vue'
const route = useRoute()
</script>
<style lang='scss' scoped>
.pre{
    // width: 1408px;
    // height: 808px;
    // margin: 16px;
    background-color: #fff;
}
.content{
    margin: 16px 16px 0 16px;
    // padding-bottom: 16px;
}
</style>