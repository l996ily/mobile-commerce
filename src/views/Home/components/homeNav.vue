<!-- 头部搜索 -->
<template>
  <div class="header">
    <img src="@/assets/logo.png">
    <div class="search">
      <van-icon
        name="search"
        size="18"
      />
    </div>
    <van-icon name="wap-nav" />
  </div>
</template>

<script setup>

</script>

<style lang='scss' scoped>
.header{
	position: fixed;
	width: 100%;
	height: 50px;
  background-color: #fff;
	display: flex;
	align-items: center;
	padding: 10px;
	box-sizing: border-box;
	z-index: 9;
	img{
		width: 100px;
	}
	.search{
		display: flex;
		align-items: center;
		width: 100%;
		background-color:#f7f7f7 ;
		margin: 10px;
		padding-left: 5px;
		border-radius: 10px;
		height: 24px;
	}
}
</style>
