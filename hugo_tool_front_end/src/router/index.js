import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import fa from "element-ui/src/locale/lang/fa";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'el-icon-s-help'},
    hidden: true,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: 'Table', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'Menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'Menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'Menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'Menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'Menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'Menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {title: 'menu2'}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: {title: 'External Link', icon: 'link'}
      }
    ]
  },

  {
    path: '/core/gold/data',
    component: Layout,
    redirect: '/core/gold/data',
    name: 'GoldDailyData',
    meta: {title: '数据', icon: 'el-icon-s-marketing'},
    alwaysShow: true,
    children: [
      {
        path: '/daily_data',
        name: 'goldDataList',
        component: () => import('@/views/core/gold/data/GoldDailyData'),
        meta: {title: '黄金价格'}
      },
      {
        path: '/monthly_data',
        name: 'goldMonthlyList',
        component: () => import('@/views/core/gold/data/GoldMonthlyData'),
        meta: {title: '黄金月报'},
        hidden:true
      },
      {
        path: '/yearly_data',
        name: 'goldYearlyList',
        component: () => import('@/views/core/gold/data/GoldYearlyData'),
        meta: {title: '黄金年报'},
        hidden:true
      },
      {
        path: '/min_max_close',
        name: 'goldMinMaxClose',
        component: () => import('@/views/core/gold/data/GoldMinMaxClose'),
        meta: {title: '黄金收盘价'},
        hidden:true
      },
      {
        path: '/nonfarm_data',
        name: 'nonfarmData',
        component: () => import('@/views/core/nonfarm/non_farm_data'),
        meta: {title: '非农数据'},
        hidden:false
      },
    ]
  },
  {
    path: '/core/gold/chart',
    component: Layout,
    redirect: '/core/gold/chart',
    name: 'GoldDataChart',
    meta: {title: '图表', icon: 'el-icon-s-marketing'},
    alwaysShow: true,
    children: [
      {
        path: '/gold_chart',
        name: 'goldDataChartList',
        component: () => import('@/views/core/gold/chart/GoldChart'),
        meta: {title: '黄金价格'}
      }
    ]
  },
  {
    path: '/core/news',
    component: Layout,
    redirect: '/core/news',
    name: 'news',
    meta: {title: '新闻', icon: 'el-icon-s-marketing'},
    alwaysShow: true,
    children: [
      {
        path: '/news_list',
        name: 'news_daily_list',
        component: () => import('@/views/core/news/news_list'),
        meta: {title: '每日新闻'}
      }
    ]
  },


  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
