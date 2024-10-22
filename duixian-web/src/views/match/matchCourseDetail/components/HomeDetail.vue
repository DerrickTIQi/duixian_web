<template>
    <div class="detail_content">
        <div class="content_left">
            <DetailCurve v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
            <DetailIndicators v-if="matchData.OV_INFO" style="margin-top: 20px;" :data="matchData"/>
            <DetailImportant v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
        </div>
        <div class="content_right" >
            <DetailScreen v-if="matchData.OV_INFO"  style="margin-top: 20px;" :data="matchData"/>
        </div>
    </div>
</template>
<script setup>
import DetailCurve from '../../matchDetail/components/DetailCurve.vue';
import DetailIndicators from '../../matchDetail/components/DetailIndicators.vue';
import DetailImportant from '../../matchDetail/components/DetailImportant.vue';
import DetailScreen from '../../matchDetail/components/DetailScreen.vue';
const props = defineProps({
  data: Object,
})
const matchData = props.data


</script>
<style lang='scss' scoped>
.detail_content{
    display: flex;
    width: 100%;
}
.content_left{
    flex: 1;
}
.content_right{
    width: 380px;
    margin-left: auto;
}
</style>