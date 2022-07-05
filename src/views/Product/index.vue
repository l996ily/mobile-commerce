<template>
  <van-nav-bar
    left-arrow
    @click-left="router.push({ name: 'home' })"
  />
  <van-tabs
    scrollspy
    sticky
    color="#fbc546"
  >
    <van-tab title="商品">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="#1989fa"
      >
        <van-swipe-item
          v-for="item in sliderImage"
          :key="item"
        >
          <van-image
            width="100%"
            height="375"
            :src="item"
          />
        </van-swipe-item>
      </van-swipe>
      <van-cell-group
        class="productDes"
        :border="false"
      >
        <van-cell
          class="spePrice"
          :border="false"
          :title="`¥ ${storeInfo?.price || 0}`"
        >
          <template #right-icon>
            <van-icon
              name="share-o"
              size="24"
            />
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class="productDetail">{{ storeInfo?.store_name }}</span>
          </template>
          <template #label>
            <span class="productInfo">
              <span>原价：¥ {{ storeInfo?.ot_price }}</span>
              <span>库存：{{ storeInfo?.stock }}</span>
              <span>销量：{{ storeInfo?.fsales }}</span>
            </span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell
        style="margin: 10px 0;"
        :border="false"
        is-link
        @click="showPopup"
      >
        已选择 {{ sku }}
      </van-cell>
      <van-popup
        v-model:show="show"
        position="bottom"
      >
        <van-cell-group>
          <van-cell class="popup-content">
            <van-image
              :src="skuInfo?.image"
              width="75"
              height="75"
            />
            <div class="popup-product">
              <div class="popup-title">
                {{ storeInfo?.store_name }}
              </div>
              <div class="popup-price">
                ¥ {{ skuInfo?.price }}
              </div>
              <div class="popup-stock">
                库存: {{ skuInfo?.stock }}
              </div>
            </div>
          </van-cell>
          <van-cell
            class="spec"
            v-for="(item,index) in productAttr"
            :key="item.id"
          >
            <p style="margin-bottom: 5px">
              {{ item.attr_name }}
            </p>
            <span
              v-for="tag in item.attr_values"
              :key="tag"
              class="tag"
              :class="{active: state.attr_values[index] === tag }"
              @click="handleTag(index, tag)"
            >{{ tag }}</span>
          </van-cell>
          <van-cell class="num-content">
            <span>数量</span>
            <van-stepper
              v-model="value"
              integer
              :max="skuInfo?.stock"
            />
          </van-cell>
        </van-cell-group>
      </van-popup>
    </van-tab>
    <van-tab
      title="评价"
    >
      <van-cell-group>
        <van-cell
          :title="`用户评价数(${replyCount})`"
          is-link
          :value="`${replyChance}%好评率`"
          @click="router.push({name: 'comment', id:props.id})"
        />
        <comment-item :reply="reply" />
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">
      <van-cell-group
        class="recommend"
        :border="false"
      >
        <van-cell>
          <p class="recommend-title">
            推荐商品
          </p>
          <van-grid
            :column-num="3"
            :border="false"
            :center="false"
          >
            <van-grid-item
              :to="{name:'product', params: {id:item.id}}"
              v-for="item in goodList"
              :key="item.id"
            >
              <van-image
                :src="item.image"
                width="107"
                height="107"
              />
              <p class="recommend-desc">
                {{ item.store_name }}
              </p>
              <p class="recomment-price">
                ¥ {{ item.price || 0 }}
              </p>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>
    </van-tab>
    <van-tab title="详情">
      <div
        class="description"
        v-html="storeInfo?.description"
      />
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { defineProps, ref, computed, reactive } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { productDetail } from '@/api/product.js'
import CommentItem from '@/components/commentItem.vue'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const router = useRouter()
const show = ref(false)
const showPopup = function () {
  show.value = !show.value
}
const productData = ref({})
const getProductDetail = async (id) => {
  const { data } = await productDetail(id)
  if (data.status !== 200) return
  productData.value = data.data
  initSku(productData.value.productAttr)
}
const storeInfo = computed(() => productData.value.storeInfo)
const sliderImage = computed(() => storeInfo.value?.slider_image)
const replyCount = computed(() => productData.value.replyCount || 0)
const replyChance = computed(() => productData.value.replyChance || 0)
const reply = computed(() => productData.value.reply)
const goodList = computed(() => productData.value?.good_list)
getProductDetail(props.id)

onBeforeRouteUpdate((to, form) => {
  productData.value = {}
  // 回到顶部
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  getProductDetail(to.params.id)
})

const productAttr = computed(() => productData.value.productAttr)
const state = reactive({
  attr_values: []
})
const initSku = function (productAttr) {
  state.attr_values = productAttr.map(item => item.attr_values[0])
}
const skuInfo = computed(() => {
  const attrValues = state.attr_values.toString()
  return productData.value.productValue?.[attrValues]
})
const sku = computed(() => skuInfo.value?.sku)
const handleTag = function (idx, tag) {
  state.attr_values[idx] = tag
}
</script>

<style lang='scss' scoped>
.van-nav-bar {
  position: fixed !important;
  top: 0;
  :deep(.van-nav-bar__left) {
    height: 44px;
    background-color: #fff;
  }
}
.van-tabs{
  background-color:#F2F2F2;
  margin-top: 50px;
  :deep(.van-tabs__wrap) {
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    width: 90%;
  }
}

.productDes{
  font-weight: 700;
  .spePrice{
    font-size: 24px;
  }
  .productDetail{
    font-size: 16px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: wrap;
  }
  .productInfo{
    display: flex;
    font-weight: 400;
    justify-content: space-between;
  }
}
:deep(.van-popup--bottom) {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px
}
.popup-content{
  :deep(.van-cell__value){
    display: flex;
    align-items: center;
    .van-image__img{
      width: 75px;
    }
    .popup-product{
      padding: 10px;
      .popup-title{
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
      }
      .popup-price{
        font-size: 16px;
        color: #F2270C;
      }
      .popup-stock{
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.spec{
  .tag {
    display: inline-block;
    min-width: 25px;
    padding: 0 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    text-align: center;
    background: #F2F2F2;
    margin-right: 7px;
  }
  .active {
    border-color: #F2270C;
    color: #F2270C;
    background-color: #FCEDEB;
  }
}
.num-content{
  :deep(.van-cell__value){
     display: flex;
    justify-content: space-between;
  }
}
.recommend{
  .recommend-title{
    font-weight: 700;
    font-size: 16px;
  }
  .recommend-desc{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: wrap;
    overflow: hidden;
    font-weight: 700;
  }
  .recomment-price{
    font-size: 12px;
    color: #F2270C;
  }
}
.description{
  width: 375px;
  :deep(img){
    width: 375px;
  }
}
</style>
