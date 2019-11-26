import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-help',
    leaf: true,
    children: [
      {
        path: '/dashboard',
        name: '首页',
        component: () => import('../views/Dashboard/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-user-solid',
    leaf: true,
    children: [
      {
        name: '账号管理',
        path: '/admin',
        component: () => import('../views/Admin/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-home',
    leaf: true,
    children: [
      {
        name: '用户管理',
        path: '/user',
        component: () => import('../views/User/index.vue')
      }
    ]
  }, 
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-share',
    leaf: true,
    children: [
      {
        name: '产品管理',
        path: '/product',
        component: () => import('../views/Product/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-grid',
    leaf: true,
    children: [
      {
        name: '详情',
        path: '/detail',
        component: () => import('../views/Detail/index.vue')
      }
    ]
  } 
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  next()
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  //   sessionStorage.removeItem('token');
  // }
  // let user = JSON.parse(<string>sessionStorage.getItem('user'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
});

export default router
