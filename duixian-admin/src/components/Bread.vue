<template>
    <div class="bread">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>
                <a href="/">主页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <a :href="getRowLink()" v-if="route.path.includes('/match/live')">赛事</a>
                <a :href="getRowLink()" v-if="route.path.includes('/match/early')">赛事</a>
                <a :href="getRowLink()" v-if="route.path.includes('/match/record')">赛事</a>
                <a :href="getRowLink()" v-if="route.path.includes('/match/followlive')">赛事</a>
                <a :href="getRowLink()" v-if="route.path.includes('/match/followearly')">赛事</a>
                <a :href="getRowLink()" v-if="route.path.includes('/afoot/recommend')">赛中过滤器</a>
                <a :href="getRowLink()" v-if="route.path.includes('/afoot/save')">赛中过滤器</a>
                <!-- <a href="/match/live" v-if="route.path.includes('/match/live')">赛事</a>
                <a href="/match/early" v-if="route.path.includes('/match/early')">赛事</a>
                <a href="/match/record" v-if="route.path.includes('/match/record')">赛事</a>
                <a href="/match/followlive" v-if="route.path.includes('/match/followlive')">赛事</a>
                <a href="/match/followearly" v-if="route.path.includes('/match/followearly')">赛事</a>
                <a href="/afoot/recommend" v-if="route.path.includes('/afoot/recommend')">赛中过滤器</a>
                <a href="/afoot/save" v-if="route.path.includes('/afoot/save')">赛中过滤器</a> -->
            </el-breadcrumb-item>
            <el-breadcrumb-item style="">数据</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </template>1
<script setup>
const route = useRoute()
const getRowLink = () =>{
    let path = null
    path = location.hash.split('/').slice(0, 3).join('/')
    return `${path}`
}
</script>
<style lang='scss' scoped>
.el-breadcrumb{
    font-size: 20px;
    
}
a{
    font-size: 14px;
    color: #8a8a8a !important;
    opacity: 0.7;
}
:deep(.el-breadcrumb__inner){
    color: #000 !important;
    font-weight: bold !important;
    cursor: pointer;
}

</style>