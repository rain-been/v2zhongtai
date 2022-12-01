import Layout from '@/layout'



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

//  定义异步路由跳转地址
// 权限管理
const Permission = () => import('@/views/acl/permission');
const Role = () => import('@/views/acl/role');
const User = () => import('@/views/acl/user');
// 商品管理
const Attr = () => import('@/views/product/attr');
const Trademark = () => import('@/views/product/trademark');
/* 
常量路由
包括登陆/404/首页
*/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
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
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]
  // 异步路由
  // 异步路由
export const asyncRoutes = [
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/role/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'Role',
        path: 'role/list',
        component: Role,
        meta: {
          title: '角色管理'
        }
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: Permission,
        meta: {
          title: '菜单管理'
        }
      },
      {
        name: 'User',
        path: 'user/list',
        component: User,
        meta: {
          title: '用户管理'
        }
      }
    ]
  },
  // 商品管理
  {
    name: "Product",
    path: '/product',
    component: Layout,
    redirect: '/product/trademark/list',
    meta: {
      title: '商品管理',
      icon: 'shop'
    },
    children: [
      {
        name: 'Trademark',
        path: 'trademark/list',
        component: Trademark,
        meta: {
          title: '品牌管理'
        }
      },
      {
        name: 'Attr',
        path: 'attr/list',
        component: () => import('@/views/product/attr'),
        meta: { 
          title: '平台属性管理', 
        },
      }
    ]
  }
]
//任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)',
  name: 'Any',
  redirect: '/404',
  meta: {
    hidden: true
  }
}
