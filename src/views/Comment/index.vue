<!-- 评价 -->
<template>
  <van-cell-group>
    <van-cell
      title="商品评价"
      :value="`好评率${replyData.reply_chance}%`"
    />
    <van-cell class="btn-style">
      <van-button
        round
        size="small"
        :class="{active: replyData.isAll}"
        @click="handleButton('0')"
      >
        全部 ({{ replyData.sum_count }})
      </van-button>
      <van-button
        round
        size="small"
        :class="{active: replyData.isGood}"
        @click="handleButton('1')"
      >
        好评 ({{ replyData.good_count }})
      </van-button>
      <van-button
        round
        size="small"
        :class="{active: replyData.isIn}"
        @click="handleButton('2')"
      >
        中评 ({{ replyData.in_count }})
      </van-button>
      <van-button
        round
        size="small"
        :class="{active: replyData.isBad}"
        @click="handleButton('3')"
      >
        差评 ({{ replyData.poor_count }})
      </van-button>
    </van-cell>
    <comment-item
      v-for="item in replyData.commentList"
      :key="item.id"
      :reply="item"
    />
  </van-cell-group>
</template>

<script setup>
import { defineProps, reactive, computed } from 'vue'
import { productReply, replyList } from '@/api/product'
import CommentItem from '@/components/commentItem.vue'
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const replyData = reactive({
  commentCounts: {},
  good_count: computed(() => replyData.commentCounts?.good_count || 0),
  in_count: computed(() => replyData.commentCounts?.in_count || 0),
  poor_count: computed(() => replyData.commentCounts?.poor_count || 0),
  reply_chance: computed(() => replyData.commentCounts?.reply_chance || 100),
  reply_star: computed(() => replyData.commentCounts?.reply_star || 0),
  sum_count: computed(() => replyData.commentCounts?.sum_count || 0),
  active: '0',
  isAll: computed(() => replyData.active === '0'),
  isGood: computed(() => replyData.active === '1'),
  isIn: computed(() => replyData.active === '2'),
  isBad: computed(() => replyData.active === '3'),
  commentList: []
})
const getProductReply = async () => {
  const { data } = await productReply(props.id)
  if (data.status !== 200) return
  replyData.commentCounts = data.data
}
getProductReply()

const handleButton = (type) => {
  replyData.active = type
  getReplyList(type)
}
const getReplyList = async (type) => {
  replyData.commentList = []
  const { data } = await replyList(props.id, { type })
  if (data.status !== 200) return
  replyData.commentList = data.data
}
getReplyList('0')
</script>

<style lang='scss' scoped>
.btn-style{

	.van-button{
		margin-right: 8px;
	}
}
.active {
  background-color: #FBC546;
}
</style>
