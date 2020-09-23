import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/home',
    redirect: "/"
  },
  {
    path: '/',
    component: Layout,
    children:[
       // 首页
       {
        path: '',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
      //登录注册
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
        meta:{
          title:'登录注册'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
