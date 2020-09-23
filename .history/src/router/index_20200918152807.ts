import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'
const routes: Array<RouteRecordRaw> = [

  {
    path: '/home',
    redirect: ""
  },
  {
    path: '',
    component: Layout,
    children: [
      // 首页
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      //登录注册
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue'),
        meta: {
          title: '登录注册'
        }
      },
      //攻略
      {
        path: '/post',
        name: 'Post',
        component: () => import('../views/post.vue'),
        meta: {
          title: '登录注册'
        },
      },
      //酒店
      {
        path: '/hotel',
        name: 'Hotel',
        component: () => import('../views/hotel.vue'),
        meta: {
          title: '登录注册'
        }
      },
      //机票
      {
        path: '/air',
        name: 'Air',
        component: () => import('../views/air.vue'),
        meta: {
          title: '登录注册'
        }
      },
       // 写游记/攻略
       {
        path: '/post/create',
        name: 'Create',
        component: () => import('../views/create.vue'),
        meta: {
          title: '添加攻略'
        }
      },
       // 游记/攻略详情
       {
        path: '/post/detail',
        name: 'Detail',
        component: () => import('../views/detail.vue'),
        meta: {
          title: '攻略详情'
        }
      },
       // 机票详情
       {
        path: '/air/flights',
        name: 'Flights',
        component: () => import('../views/flights.vue'),
        meta: {
          title: '机票详情'
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
