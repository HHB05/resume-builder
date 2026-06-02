import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页', requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: '登录', requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: '注册', requiresAuth: false },
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('@/views/PricingView.vue'),
    meta: { title: '定价', requiresAuth: false },
  },
  {
    path: '/templates',
    name: 'Templates',
    component: () => import('@/views/TemplatesView.vue'),
    meta: { title: '模板中心', requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { title: '我的简历', requiresAuth: true },
  },
  {
    path: '/editor/:id?',
    name: 'Editor',
    component: () => import('@/views/EditorView.vue'),
    meta: { title: '简历编辑', requiresAuth: true },
    props: true,
  },
  {
    path: '/analysis/:resumeId',
    name: 'Analysis',
    component: () => import('@/views/AnalysisView.vue'),
    meta: { title: '简历分析', requiresAuth: true },
    props: true,
  },
  {
    path: '/share/:token',
    name: 'Share',
    component: () => import('@/views/ShareView.vue'),
    meta: { title: '在线简历', requiresAuth: false },
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404', requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 全局前置守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - 简历制作平台`
  }

  // 检查是否需要登录
  const requiresAuth = to.meta.requiresAuth as boolean
  if (requiresAuth) {
    // 直接检查localStorage中的token
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('currentUser')

    if (!token || !user) {
      // 未登录，跳转到登录页，并记录原目标路径
      next({
        name: 'Login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }

  next()
})

// 全局后置守卫
router.afterEach(() => {
  // 可以在这里添加页面加载完成后的逻辑
})

export default router
