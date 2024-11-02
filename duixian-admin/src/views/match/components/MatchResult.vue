<template>
    <div class="result">
        <div class="navi">
            <div class="navi-date" @click="openDatePicker" :class="{active : isDateVisible}">
                <div class="rili" :style="{color: isDateVisible ? 'red' : 'inherit'}">
                    <div class="rili-text">
                        <img :src="isDateVisible ? dateSelected : dateDefault "/>
                        日历
                        <img :src="isDateVisible ? downSelected : downDefault" />
                    </div>
                    <div>
                        <el-date-picker
                        v-model="selectedDate"
                        type="date"
                        @change="handleDateChange"
                        :disabled-date="disabledDate"
                        ref="datePicker"
                        :visible="isDatePickerVisible"
                        class="hidden-datepicker"
                        />
                    </div>
                </div>
            </div>
            <div 
            class="text" 
            v-for="(item, index) in visibleNaviItems"
            :key="index"
            :class="{active: activeIndex === index}"
            @click="handleItemClick(item)">
                <span class="text-span">{{ item }}</span>
                <span style="font-size: 12px;">{{ getWeekday(item) }}</span>
            </div>
        </div>
        <div class="table">
            <MatchTable v-if="tableData" 
            :data="tableData"
            :current-page="currentPage" 
            :page-size="pageSize" 
            :total="totalItems" 
            @update:currentPage="onPageChange" 
            @update:pageSize="onPageSizeChange"
            :height="height"  />
            <div v-if="loading" class="loading-indicator">Loading...</div>
            <!-- <div ref="loadMoreTrigger" class="load-more-trigger"></div> 监听加载更多的触发点 -->
        </div>
    </div>
</template>
<script setup>
import downSelected from '@/assets/table/down-selected.png'
import downDefault from '@/assets/table/down-default.png'
import dateSelected from '@/assets/table/date-selected.png'
import dateDefault from '@/assets/table/date-default.png'
import MatchTable from './MatchTable.vue';


const naviItem = ref([])
const visibleNaviItems = computed(() => naviItem.value.slice(0, 7)); // 只显示7个导航项
const activeIndex = ref(0)
const tableData = ref([])
const loading = ref(false); // 加载状态
const hasMorePages = ref(true); // 是否有更多页面
const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 每页条目数
const totalItems = ref(0); // 总条数
const height = 'calc(100vh - 220px)'
// 使用 IntersectionObserver 监听加载更多的触发点
// const loadMoreTrigger = ref(null);

const selectedDate = ref(null);
const isDatePickerVisible = ref(false);
const isDateVisible = ref(false); // 控制图片的颜色


// 获取当前日期的格式化字符串
const getCurrentFormattedDate = () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString()
    return `${month}-${day}`; // 返回格式为 "MM-DD"
}
//获取当前是星期几
const getWeekday = (dateString) => {
    const [month, day] = dateString.split('-'); // 分割日期字符串
    const date = new Date(new Date().getFullYear(), month - 1, day); // 创建 Date 对象
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']; // 星期几名称数组
    

    // 获取当前日期的格式化字符串
    const currentDateString = getCurrentFormattedDate();

    // 如果当前日期与传入的日期相同，返回“今天”
    if (dateString === currentDateString) { 
        return '今天';
    }

    return weekdays[date.getDay()]; // 获取星期几
}

// 打开 DatePicker
const openDatePicker = () => {
    isDateVisible.value = !isDateVisible.value
    isDatePickerVisible.value = !isDatePickerVisible.value; // 显示日期选择器
};

// 日期选择器的禁用日期函数
const disabledDate = (time) => {
  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString()
    return `${month}-${day}`;
  };
  const formattedTime = formatDate(time);
    
  // 返回 `true` 表示禁用日期（即 `naviItem` 中不包含的日期）
  return !naviItem.value.includes(formattedTime);
};

watch(selectedDate,(newDate) => {
    if(newDate){
        const formattedDate = formatDate(newDate)
        if(naviItem.value.includes(formattedDate)){
            activeIndex.value = naviItem.value.indexOf(formattedDate) //更新导航栏
            handleItemClick(formattedDate)
        }
    }
})

// 日期格式化函数
const formatDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString()
  return `${month}-${day}`;
};

// 处理 DatePicker 选择的日期
const handleDateChange = (date) => {
  const selected = formatDate(date);
  
  if (naviItem.value.includes(selected)) {
    handleItemClick(selected); // 选择有效日期后，触发导航点击处理
    isDatePickerVisible.value = false; // 关闭日期选择器
    isDateVisible.value = false; // 恢复图片为默认状态
  }
};

filterRecord().then((res) => {
    naviItem.value = res.date.map(item => formatDate(new Date(item.date)));

    // 如果naviItem中有数据，则调用handleItemClick来处理第一个导航项
    if (naviItem.value.length > 0) {
        // handleItemClick(naviItem.value[0]); // 点击第一个导航项
        const firstAvailableDateStr = naviItem.value[0];

        // 将第一个可选日期的字符串转换为 `Date` 对象，并设置为 `selectedDate`
        const [month, day] = firstAvailableDateStr.split('-');
        const firstAvailableDate = new Date(new Date().getFullYear(), parseInt(month) - 1, parseInt(day));

        selectedDate.value = firstAvailableDate;

        // 触发第一个导航项的点击事件
        handleItemClick(firstAvailableDateStr);
    }
});


// 点击导航项处理函数
const handleItemClick = async (item) => {
    activeIndex.value = naviItem.value.indexOf(item); // 更新选中的索引
    currentPage.value = 1; // 重置页码
    hasMorePages.value = true; // 重置是否有更多页面
    tableData.value = []; // 清空之前的数据

    const body = {
        date: item, // 传入选中的日期
        lids: [],
        page: currentPage.value
    };

    try {
        // 先加载第一页数据
        await fetchPageData(body);

        // 在第一页数据加载完成后，开始监听触发点
        // observeLoadMoreTrigger(); 
    } catch (error) {
        console.error("获取数据时发生错误:", error);
    }
};
const fetchPageData = async () => {
    if (loading.value) return; // 避免重复请求
    loading.value = true;

    const body = {
        date: naviItem.value[activeIndex.value],
        lids: [],
        page: currentPage.value
    };

    try {
        const res = await listRecord(body);
        totalItems.value = res.total; // 更新总条数
        const totalList = res.list; // 当前请求的数据
        let allData = [...totalList]; // 初始化合并数据的数组

        // 请求数据，直到达到所需的 pageSize
        while (allData.length < pageSize.value) {
            currentPage.value += 1; // 增加当前页码

            // 创建新的请求体
            const nextPageBody = {
                date: naviItem.value[activeIndex.value],
                lids: [],
                page: currentPage.value,
            };

            // 请求下一页的数据
            const ress = await listRecord(nextPageBody);
            allData = [...allData, ...ress.list]; // 合并数据
            if (ress.list.length < pageSize.value) {
                break; // 没有更多数据了，退出循环
            }
        }

        tableData.value = allData; // 更新最终的数据
    } catch (error) {
        console.error("获取分页数据时发生错误:", error);
    } finally {
        loading.value = false;
    }
};

const onPageChange = async (newPage) => {
    if(pageSize.value / 20 === 2){
        currentPage.value = 2 * newPage - 1;
    }else if(pageSize.value / 20 === 3){
        currentPage.value = 3 * newPage - 2
    }else{
        currentPage.value = newPage
    }
    await fetchPageData();
};

const onPageSizeChange = async (newSize) => {
    pageSize.value = newSize; // 更新每页条数
    currentPage.value = 1; // 重置为第一页
    await fetchPageData(); // 重新请求第一页数据
};

// // 获取分页数据函数
// const fetchPageData = async (body) => {
//     try {
//         loading.value = true;
//         const res = await listRecord(body);
//         tableData.value.push(...res.list); // 将新获取的数据合并到表格数据中

//         // 如果当前页数小于总页数，设置可以加载更多
//         hasMorePages.value = res.now_page < res.pages;
//         loading.value = false;
//     } catch (error) {
//         console.error("获取分页数据时发生错误:", error);
//         loading.value = false;
//         throw error;
//     }
// }
// // 监听触发点的函数
// const observeLoadMoreTrigger = () => {
//     const observer = new IntersectionObserver(async (entries) => {
//         const [entry] = entries;
//         if (entry.isIntersecting && hasMorePages.value && !loading.value) {
//             // 如果可见并且有更多页面且不在加载中，加载下一页
//             currentPage.value++;
//             const body = {
//                 date: naviItem.value[activeIndex.value],
//                 lids: [],
//                 page: currentPage.value
//             };
//             await fetchPageData(body);// 加载下一页数据
//         }
//     })
//     // 开始监听加载更多的触发点
//     if (loadMoreTrigger.value) {
//         observer.observe(loadMoreTrigger.value);
//     }
// }
</script>
<style lang='scss' scoped>
.navi {
    display: flex;
    height: 44px;
    cursor: pointer;
    background-color: #ebebeb;
    position: relative;
}
.navi-date{
    display: flex;
    position: relative;
}
.rili{
    width: 100px;
    position: relative;
    
}
.rili-text{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin-top: 10px;
    margin-left: 20px;
}
.text{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    font-size: 14px;
    z-index: 1000;
}
.text-span{
    width: 182px ;
}
.text.active {
  background-color: #fff; // 选中时背景颜色
  color: #e92937; // 选中时字体颜色
  font-weight: 600;
}
.loading-indicator {
    text-align: center;
    padding: 16px;
}
.load-more-trigger {
    height: 1px;
}
/* 隐藏 DatePicker 的输入框和边框 */
:deep(.hidden-datepicker .el-input__wrapper) {
    display: none; /* 隐藏输入框 */
}

.hidden-datepicker .el-input {
    border: none; /* 隐藏边框 */
    padding: 0; /* 清除默认 padding */
}
</style>