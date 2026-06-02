import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import i18n from './i18n'
import App from './App.vue'
import './assets/styles/main.css'

// 强制清理所有缓存（每次打开都清理）
localStorage.clear()
sessionStorage.clear()

// 创建Vue应用
const app = createApp(App)

// 安装插件
app.use(createPinia())
app.use(router)
app.use(i18n)

// 挂载应用
app.mount('#app')
