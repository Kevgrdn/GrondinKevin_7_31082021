import { createRouter, createWebHashHistory } from 'vue-router'
import Feed from '../views/FeedView.vue'
import Login from '../views/HomeView.vue'
import Subscribe from '../views/SubscribeView.vue'
import Chat from '../views/ChatView.vue'
import Post from '../views/PostView.vue'


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
    path:'/post',
    name:'post',
    component: Post
  },
  {
    path:'/chat',
    name:'chat',
    component: Chat 
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/users',
    name:'Users',
    component: () => import('../views/UsersView.vue')
  },
  {
    path:'/ModifyProfile',
    name:'ModifyProfile',
    component: () => import('../views/ModifyProfileView.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
