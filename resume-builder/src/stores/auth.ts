import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserLoginParams, UserRegisterParams, UserLoginResponse } from '@/types'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const currentUser = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const isAuthenticated = computed(() => !!accessToken.value && !!currentUser.value)
  const isLoggedIn = computed(() => isAuthenticated.value)
  const isProUser = computed(() => currentUser.value?.planType === 'pro')
  const isEnterpriseUser = computed(() => currentUser.value?.planType === 'enterprise')
  const planType = computed(() => currentUser.value?.planType || 'free')
  const userNickname = computed(() => currentUser.value?.nickname || '用户')
  const userAvatar = computed(() => currentUser.value?.avatarUrl || null)

  // 初始化：从本地存储恢复状态
  function initialize() {
    // 清理旧的缓存（Session Storage）
    sessionStorage.clear()

    const storedAccessToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    const storedUser = localStorage.getItem('currentUser')

    if (storedAccessToken && storedRefreshToken && storedUser) {
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken
      try {
        currentUser.value = JSON.parse(storedUser)
      } catch (e) {
        console.error('Failed to parse stored user:', e)
        clearAuth()
      }
    }
  }

  // 登录
  async function login(params: UserLoginParams): Promise<boolean> {
    loading.value = true
    error.value = null

    // 清理旧的缓存数据
    localStorage.clear()
    sessionStorage.clear()

    try {
      const response: UserLoginResponse = await authService.login(params)
      setAuth(response)
      return true
    } catch (e: any) {
      error.value = e.message || '登录失败'
      return false
    } finally {
      loading.value = false
    }
  }

  // 注册
  async function register(params: UserRegisterParams): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response: UserLoginResponse = await authService.register(params)
      setAuth(response)
      return true
    } catch (e: any) {
      error.value = e.message || '注册失败'
      return false
    } finally {
      loading.value = false
    }
  }

  // 登出
  async function logout(): Promise<void> {
    try {
      if (accessToken.value) {
        await authService.logout()
      }
    } catch (e) {
      console.error('Logout error:', e)
    } finally {
      clearAuth()
    }
  }

  // 刷新用户信息
  async function refreshProfile(): Promise<void> {
    if (!accessToken.value) return

    try {
      const user = await authService.getProfile()
      currentUser.value = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (e) {
      console.error('Refresh profile error:', e)
      clearAuth()
    }
  }

  // 更新用户信息
  async function updateProfile(params: Partial<User>): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const updateParams: any = { ...params }
      if (updateParams.avatarUrl === null) {
        delete updateParams.avatarUrl
      }
      const user = await authService.updateProfile(updateParams)
      currentUser.value = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true
    } catch (e: any) {
      error.value = e.message || '更新失败'
      return false
    } finally {
      loading.value = false
    }
  }

  // 设置认证信息
  function setAuth(response: UserLoginResponse) {
    currentUser.value = response.user
    accessToken.value = response.accessToken
    refreshToken.value = response.refreshToken

    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
    localStorage.setItem('currentUser', JSON.stringify(response.user))
  }

  // 清除认证信息
  function clearAuth() {
    currentUser.value = null
    accessToken.value = null
    refreshToken.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('currentUser')
  }

  // 更新Token
  function updateTokens(newAccessToken: string, newRefreshToken: string) {
    accessToken.value = newAccessToken
    refreshToken.value = newRefreshToken

    localStorage.setItem('accessToken', newAccessToken)
    localStorage.setItem('refreshToken', newRefreshToken)
  }

  // 初始化
  initialize()

  return {
    // 状态
    currentUser,
    accessToken,
    refreshToken,
    loading,
    error,

    // 计算属性
    isAuthenticated,
    isLoggedIn,
    isProUser,
    isEnterpriseUser,
    planType,
    userNickname,
    userAvatar,

    // 方法
    login,
    register,
    logout,
    refreshProfile,
    updateProfile,
    setAuth,
    clearAuth,
    updateTokens,
  }
})
