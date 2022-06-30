<!-- 首页 -->
<template>
  <home-nav />
  <home-main class="home-main" />
  <footer-layout />
</template>

<script setup>
import HomeNav from './components/homeNav.vue'
import HomeMain from './components/homeMain.vue'
import FooterLayout from '../../components/footerLayout.vue'
</script>

<style lang='scss' scoped>
.home-main {
  background-color: #f7f7f7;
  padding: 50px 0;
  margin-bottom: 10px;
}
</style>
