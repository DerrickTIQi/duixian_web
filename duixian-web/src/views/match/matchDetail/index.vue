<template>
    <div class="matchDetail">
        <div class="title">
            <div class="group">土伦杯 分组赛 C组</div>
            <div class="time">2023/06/13 20:00</div>
        </div>
        <div class="status">
            87'
        </div>
        <div class="team">
            <div class="one_team">
                <div class="win">[意甲 2]</div>
                <div class="team_name">国际米兰</div>
                <img src="@/assets/detail/hteam.png" class="logo"/>
                <div class="team_point">4</div>
            </div>
            <div class="half">
                半场 1-1
            </div>
            <div class="one_team">
                <div class="team_point">0</div>
                <img src="@/assets/detail/gteam.png" class="logo"/>
                <div class="team_name">曼城</div>
                <div class="win">[英格兰超级联赛 1]</div>
            </div>
        </div>

        <div class="detail_table">
            <DetailTable />
        </div>

        <div class="detail_content">
            <div class="content_left">
                <DetailCurve style="margin-top: 20px;"/>
                <DetailIndicators style="margin-top: 20px;"/>
                <DetailImportant style="margin-top: 20px;"/>
            </div>
            <div class="content_right">
                <DetailScreen style="margin-top: 20px;"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import DetailTable from './components/DetailTable.vue';
import DetailCurve from './components/DetailCurve.vue';
import DetailIndicators from './components/DetailIndicators.vue';
import DetailImportant from './components/DetailImportant.vue';
import DetailScreen from './components/DetailScreen.vue';

</script>
<style lang='scss' scoped>
.matchDetail{
    width: 1200px;
    margin: 0 auto;
}
.title{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin-top: 20px;
    font-size: 12px;
    .time{
        margin-left: 40px;
    }
}
.status{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    color: #ff3b30;
    font-size: 14px;
    margin-top: 10px;
}
.team{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    padding-left: 30px;
    .half{
        color: rgba(142, 142, 147, 1);
        font-size: 12px;
        margin: 0 40px;
    }
    .one_team{
        display: flex;
        align-items: center; /* 垂直居中 */
        .win{
            color: rgba(142, 142, 147, 1);
            font-size: 14px;
        }
        .team_name{
            color: rgba(0, 0, 0, 1);
            font-size: 18px;
            font-weight: 600;
            margin: 0 5px;
        }
        .logo{
            margin: 0 5px;
        }
        .team_point{
            color: rgba(0, 0, 0, 1);
            font-size: 40px;
            font-weight: 600;
            margin: 0 15px;
        }
    }
}
.detail_table{
    margin-top: 20px;
}
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