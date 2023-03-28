import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from '@/views/LandingPage.vue'

import SignUpPage from '@/views/SignUpPage.vue'
import QuestionnairePage from '@/views/QuestionnairePage.vue'

import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import FoodLogPage from '@/views/FoodLogPage.vue'
import ExerciseLogPage from '@/views/ExerciseLogPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import AddFoodPage from '@/views/AddFoodPage.vue'
import AddExerPage from '@/views/AddExerPage.vue'
import { nextTick } from 'vue';


const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
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

  {
    path: '/AddExerPage',
    name: 'AddExerPage',
    component: AddExerPage
  },

  {
    path: '/QuestionnairePage',
    name: 'QuestionnairePage',
    component: QuestionnairePage
  },

  {
    path: '/AddFoodPage',
    name: 'AddFoodPage',
    component: AddFoodPage
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Landing Page -> Log in / SignUp -> Questionaire
  // User Cannot access beyond login page
  if (to.name == 'LandingPage' || to.name =='LoginPage' || to.name == 'SignUpPage' || to.name == "QuestionnairePage" ) {
    next();
  } else {
    const auth = getAuth()
    var isAuthenticated = false
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        if (to.name == from.name) {
          return
        } else {
          next("/LoginPage") 
        }
      }
    })
  }
})

export default router

