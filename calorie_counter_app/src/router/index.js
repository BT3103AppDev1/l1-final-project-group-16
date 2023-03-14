import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'

import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'

import HomePage from '@/views/HomePage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import FoodLogPage from '@/views/FoodLogPage.vue'
import ExerciseLogPage from '@/views/ExerciseLogPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/SignUpPage',
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/DashboardPage',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/FoodLogPage',
    name: 'FoodLog',
    component: FoodLogPage
  },
  {
    path: '/ExerciseLogPage',
    name: 'ExerciseLog',
    component: ExerciseLogPage
  },
  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: ProfilePage
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router