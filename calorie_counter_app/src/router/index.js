import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LandingPage from '@/views/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router