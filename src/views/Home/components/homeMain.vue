<!-- 主体部分 -->
<template>
  <van-pull-refresh v-model="status.refreshing" @refresh="onRefresh">
    <!-- 头部swipe -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      lazy-render
    >
      <van-swipe-item
        v-for="item in images"
        :key="item"
      >
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <!-- 菜单列表 -->
    <van-grid>
      <van-grid-item
        v-for="item in menus"
        :key="item"
        :icon="item.img"
        :text="item.info[0].value"
      />
    </van-grid>
    <!-- 公告 -->
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="false"
    >
      <span>热点资讯公告：</span>
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="3000"
        :show-indicators="false"
      >
        <van-swipe-item
          v-for="(item,index) in newsData"
          :key="index"
        >
          {{ item.chiild[0].val }}
        </van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <van-list
      v-model:loading="status.loading"
      :finished="status.finished"
      finished-text="没有更多了"
      @load="initProducts"
    >
      <product-list
        class="productList"
        :products-data="productsData"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import { getDiy, getProducts } from '@/api/home.js'
import { ref, computed, reactive } from 'vue'
import ProductList from '@/components/productsList.vue'

// 获取首页数据
const initData = ref({})
const getInitData = async function () {
  const { data } = await getDiy()
  if (data.status !== 200) return
  initData.value = data.data
  status.refreshing = false
}
getInitData()
// 获取swipe
const images = computed(() => initData.value.swiperBg?.default.imgList.list)
// 获取菜单
const menus = computed(() => initData.value.menus?.default.imgList.list)
// 获取公告栏
const newsData = computed(() => initData.value.news?.default.newList.list)

// 获取列表数据
let page = 1
const limit = 4
const productsData = ref([])
const status = reactive({
  loading: false,
  finished: false,
  refreshing: false
})
const initProducts = async function () {
  const { data } = await getProducts({
    page,
    limit
  })
  if (data.status !== 200) return
  productsData.value.push(...data.data)
  status.loading = false
  if (data.data < limit) {
    status.finished = true
  }
  page++
}
const onRefresh = function () {
  // 清空所有的数据
  page = 1
  initData.value = []
  productsData.value = []

  status.loading = false
  status.finished = false
  // 重新发起请求
  initProducts()
  getInitData()
}
</script>
<script>
export default {
  name: 'HomeMain'
}
</script>

<style lang='scss' scoped>
img {
  width: 100%;
  height: 170px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
:deep(.van-notice-bar__content){
  display: flex;
  align-items: center;
}
.productList{
  margin-top: 10px;
}
</style>
