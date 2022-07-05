import request from '@/utils/request.js'

export const productDetail = productId => request({
  method: 'GET',
  url: `/product/detail/${productId}`
})

export const productReply = productId => request({
  method: 'GET',
  url: `/reply/config/${productId}`
})

export const replyList = (productId, params) => request({
  method: 'GET',
  url: `/reply/list/${productId}`,
  params
})
