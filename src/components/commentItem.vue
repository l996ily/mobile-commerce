<!-- 评论页 -->
<template>
  <van-cell v-if="reply?.id">
    <div class="user-info">
      <van-image
        width="28"
        height="28"
        :src="reply?.avatar"
      />
      <span style="padding: 0 8px">{{ reply?.nickname }}</span>
      <van-rate
        size="16px"
        v-model="star"
        readonly
      />
    </div>
    <div class="time">
      {{ reply?.add_time }}
    </div>
    <div class="comment-content">
      {{ reply?.comment }}
    </div>
    <ul class="picture">
      <li
        v-for="(item, index) in pics"
        :key="index"
      >
        <van-image
          width="78"
          height="78"
          :src="item"
        />
      </li>
    </ul>
  </van-cell>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
  reply: {
    type: Object,
    required: true
  }
})
const star = computed(() => Number(props.reply?.star))
const pics = computed(() => props.reply?.pics)
</script>

<style lang='scss' scoped>
.user-info{
  padding: 7px 0;
  display: flex;
  align-items: center;
}
.picture{
  display: flex;
  flex-wrap: wrap;
}
</style>
