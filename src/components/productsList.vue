<!-- 商品列表页 -->
<template>
  <van-grid
    :column-num="2"
    :gutter="10"
    :center="false"
  >
    <van-grid-item
      v-for="item in props.productsData"
      :key="item.id"
      :to="{name:'product',params:{id:item.id}}"
    >
      <van-image :src="item.image" />
      <p class="title">
        {{ item.store_name }}
      </p>
      <p class="price">
        ￥{{ item.price }}
      </p>
      <p class="sale">
        已售{{ item.sales }}件
      </p>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  productsData: {
    type: Array,
    required: true
  }
})
</script>

<style lang='scss' scoped>
.van-grid-item{
	font-size: 14px;
	:deep(.van-grid-item__content){
		padding: 0;
		width: 165px;
		border-radius: 10px;
		overflow: hidden;
    padding-right: 5px;
	}
	.van-image{
		width: 165px;
		height: 165px;
	}
	.title{
		margin-left:5px;
		padding-top: 5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: wrap;
	}
	.price{
		font-size: 22px;
		color: #ee3e3e;
	}
	.sale{
		margin:0 0 5px 6px;
		color: #ccc;
	}
}
</style>
