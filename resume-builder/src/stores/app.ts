import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { ThemeMode, Locale } from '@/types'

export const useAppStore = defineStore('app', () => {
  // 状态
  const theme = ref<ThemeMode>('light')
  const locale = ref<Locale>('zh-CN')
  const isMobile = ref(false)
  const isTablet = ref(false)
  const sidebarCollapsed = ref(false)
  const isOnline = ref(navigator.onLine)
  const notifications = ref<{ id: string; type: string; message: string }[]>([])

  // 计算属性
  const isDark = computed(() => {
    if (theme.value === 'dark') return true
    if (theme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const isDesktop = computed(() => !isMobile.value && !isTablet.value)

  const currentLanguage = computed(() => {
    const langMap: Record<Locale, string> = {
      'zh-CN': '简体中文',
      'zh-TW': '繁體中文',
      en: 'English',
      ja: '日本語',
    }
    return langMap[locale.value]
  })

  // 设置主题
  function setTheme(newTheme: ThemeMode) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  // 切换主题
  function toggleTheme() {
    if (theme.value === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // 应用主题
  function applyTheme() {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // 设置语言
  function setLocale(newLocale: Locale) {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    document.documentElement.lang = newLocale
  }

  // 设置移动端状态
  function setMobileFlag(mobile: boolean) {
    isMobile.value = mobile
  }

  // 设置平板状态
  function setTabletFlag(tablet: boolean) {
    isTablet.value = tablet
  }

  // 切换侧边栏
  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  // 折叠侧边栏
  function collapseSidebar() {
    sidebarCollapsed.value = true
  }

  // 展开侧边栏
  function expandSidebar() {
    sidebarCollapsed.value = false
  }

  // 设置在线状态
  function setOnlineStatus(online: boolean) {
    isOnline.value = online
  }

  // 添加通知
  function addNotification(type: string, message: string) {
    const id = `notification-${Date.now()}`
    notifications.value.push({ id, type, message })

    // 3秒后自动移除
    setTimeout(() => {
      removeNotification(id)
    }, 3000)
  }

  // 移除通知
  function removeNotification(id: string) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  // 清除所有通知
  function clearNotifications() {
    notifications.value = []
  }

  // 初始化
  function initialize() {
    // 从本地存储恢复设置
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null
    const storedLocale = localStorage.getItem('locale') as Locale | null

    if (storedTheme) {
      theme.value = storedTheme
    }
    if (storedLocale) {
      locale.value = storedLocale
    }

    // 应用主题
    applyTheme()

    // 设置语言
    document.documentElement.lang = locale.value

    // 检测设备类型
    checkDeviceType()

    // 监听在线状态
    window.addEventListener('online', () => setOnlineStatus(true))
    window.addEventListener('offline', () => setOnlineStatus(false))

    // 监听窗口大小变化
    window.addEventListener('resize', checkDeviceType)
  }

  // 检测设备类型
  function checkDeviceType() {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
  }

  // 监听主题变化
  watch(theme, () => {
    applyTheme()
  })

  // 初始化
  initialize()

  return {
    // 状态
    theme,
    locale,
    isMobile,
    isTablet,
    sidebarCollapsed,
    isOnline,
    notifications,

    // 计算属性
    isDark,
    isDesktop,
    currentLanguage,

    // 方法
    setTheme,
    toggleTheme,
    setLocale,
    setMobileFlag,
    setTabletFlag,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
    setOnlineStatus,
    addNotification,
    removeNotification,
    clearNotifications,
    initialize,
  }
})
