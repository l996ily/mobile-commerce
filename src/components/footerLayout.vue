<!-- 底部标签栏 -->
<template>
  <van-tabbar route>
    <van-tabbar-item
      to="/"
      icon="home-o"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      to="/category"
      icon="apps-o"
    >
      分类
    </van-tabbar-item>
    <van-tabbar-item
      to="/recomment"
      icon="hot-o"
    >
      推荐
    </van-tabbar-item>
    <van-tabbar-item to="/cart">
      <template #icon="props">
        <img :src="props.active ? icon.cartActive : icon.cartInactive">
      </template>
      购物车
    </van-tabbar-item>
    <van-tabbar-item
      to="/user"
      icon="user-circle-o"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import cartActive from '@/assets/cart-active.png'
import cartInactive from '@/assets/cart-inactive.png'
const icon = {
  cartActive,
  cartInactive
}
</script>

<style lang="scss" scoped>
.van-tabbar {
position: fixed !important
}
img{
width: 22px;
height: 22px;
}
</style>
