import Vue from 'vue'
import VueRouter, { RawLocation }  from 'vue-router'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import store from '@/store'
import { generateRoutes } from './permission'

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return (<any>(routerPush.call(this, location))).catch((error: any)=> error)
}

Vue.use(VueRouter)

// 公共路由，全部角色均具有该部分路由权限
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
    redirect: '/dashboard',
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
    iconCls: 'el-icon-star-on',
    leaf: true,
    hidden: true,  // 路由是否在侧边导航栏中显示
    children: [
      {
        name: '404页面',
        path: '/404',
        component: () => import('../views/ErrorPage/404.vue')
      }
    ]
  }
]

// 需根据权限进行动态生成的路由
const asyncRoutes = [
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-s-grid',
    leaf: true,
    children: [
      {
        name: '表格',
        path: '/admin',
        component: () => import('../views/AdminTable/index.vue'),
        meta: {
          roles: ['admin', 'editor']  // 该部分和权限相关
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '图表',
    iconCls: 'el-icon-s-data',
    leaf: false,
    children: [
      {
        name: '图表Tab',
        iconCls: 'el-icon-help',
        path: '/chart',
        component: () => import('../views/Charts/index.vue'),
        meta: {
          roles: ['admin']
        }
      },
      {
        name: '图标Icon',
        iconCls: 'el-icon-bicycle',
        path: '/icon',
        component: () => import('../views/Icon/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
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
        name: 'Form表单',
        path: '/form',
        component: () => import('../views/Form/index.vue'),
        meta: {
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-star-on',
    leaf: true,
    children: [
      {
        name: 'Vuex使用',
        path: '/vuex',
        component: () => import('../views/VuexRelated/index.vue'),
        meta: {
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '',
    iconCls: 'el-icon-edit-outline',
    leaf: true,
    children: [
      {
        name: '富文本',
        path: '/tiny',
        component: () => import('../views/Tinymce/index.vue'),
        meta: {
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',  // 重定向到404页面
    hidden: true
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

var flag = true  // 页面刷新标志
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('pass');
    store.dispatch('app/ResetRouter');  // 全局路由tag重置
    flag = true
  }
  let admin = <String>sessionStorage.getItem('name');
  if (!admin && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    // 该处进行动态路由生成（当页面刷新时或首次进入该系统时，生成路由）
    if (flag && to.path !== '/login') {
      flag = false
      router['options'].routes = routes
      let generateAsyncRoutes = generateRoutes(asyncRoutes, <string>sessionStorage.getItem('name'))  // 根据登录角色生成动态路由
      router.addRoutes(generateAsyncRoutes)
      router['options'].routes = router['options'].routes.concat(generateAsyncRoutes)
      next({ ...to, replace: true })  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
    } else {
      // 以下部分为向全局变量中添加路由历史，形成tag标签
      if (to.path !== '/login') {
        let newPath = {
          name: to.name,
          path: to.fullPath
        }
        store.dispatch("app/AddRouter", newPath)  // 向全局变量中添加路由
      }
      next()
    }
  }
});

export default router
