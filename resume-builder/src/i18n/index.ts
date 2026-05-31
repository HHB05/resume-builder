import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN/common.json'
import en from './en/common.json'

// 获取浏览器语言
function getDefaultLocale(): string {
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  if (browserLang.startsWith('en')) {
    return 'en'
  }
  return 'zh-CN'
}

// 从本地存储获取用户选择的语言
function getStoredLocale(): string | null {
  return localStorage.getItem('locale')
}

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getStoredLocale() || getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    en: en,
  },
})

export default i18n

// 切换语言
export function setLocale(locale: string) {
  ;(i18n.global.locale as any).value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

// 获取当前语言
export function getLocale(): string {
  return (i18n.global.locale as any).value
}

// 获取语言列表
export function getLocaleList() {
  return [
    { code: 'zh-CN', name: '简体中文' },
    { code: 'en', name: 'English' },
  ]
}
