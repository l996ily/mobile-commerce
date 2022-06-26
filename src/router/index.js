import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home/index.vue')
  },
  {
    name: 'Category',
    path: '/category',
    component: () => import('@/views/Category/index.vue')
  },
  {
    name: 'Recomment',
    path: '/recomment',
    component: () => import('@/views/Recomment/index.vue')
  },
  {
    name: 'User',
    path: '/user',
    component: () => import('@/views/User/index.vue')
  },
  {
    name: 'Cart',
    path: '/cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/views/Product/index.vue')
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/views/Product/index.vue')
  },
  {
    name: 'Error',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/Error/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
