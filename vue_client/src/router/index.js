import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/reviews',
    name: 'reviews',
    component: () => import('../components/ReviewsList')
  },
  {
    path: '/review/:id',
    name: 'review-details',
    component: () => import('../components/Review')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/AddReview')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
