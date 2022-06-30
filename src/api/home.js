import request from '@/utils/request.js'

export const getDiy = params => request({
  method: 'GET',
  url: '/v2/diy/get_diy/moren',
  params
})

export const getProducts = params => request({
  method: 'GET',
  url: '/products',
  params
})
