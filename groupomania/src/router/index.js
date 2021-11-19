import { createRouter, createWebHashHistory } from 'vue-router'
import Feed from '../views/FeedView.vue'
import Login from '../views/HomeView.vue'
import Subscribe from '../views/SubscribeView.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/subscribe',
    name:'subscribe',
    component: Subscribe
  },

  {
    path: '/feed',
    name: 'home',
    component: Feed
  },
  {
    path:'/profile',
    name:'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path:'/users',
    name:'Users',
    component: () => import('../views/UsersView.vue')
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
