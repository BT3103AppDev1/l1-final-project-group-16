import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from '@/views/LandingPage.vue'

import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'

import HomePage from '@/views/HomePage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import FoodLogPage from '@/views/FoodLogPage.vue'
import ExerciseLogPage from '@/views/ExerciseLogPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import AddFoodPage from '@/views/AddFoodPage.vue'


const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: {
      requiresAuth: true,

    }
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
    path: '/AddFoodPage',
    name: 'AddFoodPage',
    component: AddFoodPage
  },

]


const router = createRouter({
  history: createWebHistory(),
  routes
})
//Add a navigation guard that executes before any navigation. 
//Returns a function that removes the registered guard.


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser) {
      next();
    } else {
      alert("You are not logged in!");
      next("/");
    }
  }
  else {
    next();

  }
}
)

export default router

