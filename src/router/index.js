import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/Category/index.vue')
  },
  {
    name: 'recomment',
    path: '/recomment',
    component: () => import('@/views/Recomment/index.vue')
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/User/index.vue')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    name: 'product',
    path: '/product/:id',
    component: () => import('@/views/Product/index.vue'),
    props: true
  },
  {
    name: 'comment',
    path: '/comment/:id',
    component: () => import('@/views/Comment/index.vue'),
    props: true
  },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/Error/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
