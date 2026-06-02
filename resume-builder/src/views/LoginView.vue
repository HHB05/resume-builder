<template>
  <div class="min-h-screen bg-stone-950 flex">
    <!-- Left side - Branding with templates preview -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div class="relative z-10 flex flex-col justify-center px-12">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-xl">R</span>
          </div>
          <span class="font-serif text-2xl">ResumeCraft</span>
        </div>

        <h1 class="text-4xl font-serif leading-tight tracking-tight mb-4">
          打造<br>
          <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            令人难忘的
          </span><br>
          简历
        </h1>

        <p class="text-stone-400 max-w-md mb-6">
          AI 驱动的专业简历制作平台，让求职更简单
        </p>

        <!-- Template Preview Grid -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div v-for="(tpl, index) in previewTemplates" :key="index"
            @click="selectTemplate(tpl)"
            class="aspect-[3/4] rounded-lg overflow-hidden border border-stone-700/50 hover:border-amber-500/50 transition-all cursor-pointer">
            <img :src="tpl.thumbnail" :alt="tpl.name" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="flex gap-6">
          <div class="text-center">
            <div class="text-2xl font-serif text-amber-400">50+</div>
            <div class="text-xs text-stone-500">专业模板</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-serif text-amber-400">10万+</div>
            <div class="text-xs text-stone-500">用户信赖</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-serif text-amber-400">98%</div>
            <div class="text-xs text-stone-500">好评率</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Login form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-md">
        <!-- Mobile logo -->
        <div class="lg:hidden flex items-center gap-3 mb-8 justify-center">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-lg">R</span>
          </div>
          <span class="font-serif text-xl">ResumeCraft</span>
        </div>

        <!-- Mobile template preview -->
        <div class="lg:hidden grid grid-cols-4 gap-2 mb-8">
          <div v-for="(tpl, index) in previewTemplates.slice(0, 4)" :key="index"
            @click="selectTemplate(tpl)"
            class="aspect-[3/4] rounded-lg overflow-hidden border border-stone-700/50 cursor-pointer hover:border-amber-500/50 transition-all">
            <img :src="tpl.thumbnail" :alt="tpl.name" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h2 class="text-3xl font-serif tracking-tight">欢迎回来</h2>
            <p class="text-stone-500 mt-2">登录您的账号继续使用</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-stone-400 mb-2">邮箱地址</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="请输入邮箱"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-stone-400 mb-2">密码</label>
                <input
                  v-model="form.password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="form.rememberMe" class="w-4 h-4 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-amber-500">
                <span class="text-sm text-stone-400">记住我</span>
              </label>
              <a href="#" class="text-sm text-amber-400 hover:text-amber-300 transition-colors">忘记密码？</a>
            </div>

            <div v-if="authStore.error" class="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {{ authStore.error }}
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <svg v-if="authStore.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ authStore.loading ? '登录中...' : '登录' }}
            </button>
          </form>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-stone-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-stone-950 text-stone-500">或者</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <button class="py-3 px-4 bg-stone-800/50 border border-stone-700 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center">
              <span class="text-xl">📱</span>
            </button>
            <button class="py-3 px-4 bg-stone-800/50 border border-stone-700 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center">
              <span class="text-xl">💬</span>
            </button>
            <button class="py-3 px-4 bg-stone-800/50 border border-stone-700 rounded-xl hover:bg-stone-800 transition-colors flex items-center justify-center">
              <span class="text-xl">🐙</span>
            </button>
          </div>

          <p class="text-center text-stone-500">
            还没有账号？
            <router-link to="/register" class="text-amber-400 hover:text-amber-300 transition-colors">免费注册</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

// 预览模板 - 需要与模板ID对应
const previewTemplates = [
  { id: 'cn-001', name: '简约经典', thumbnail: '/templates/chinese/001.jpg' },
  { id: 'cn-002', name: '商务专业', thumbnail: '/templates/chinese/002.jpg' },
  { id: 'cn-005', name: '创意设计', thumbnail: '/templates/chinese/005.jpg' },
  { id: 'cn-009', name: '创意求职', thumbnail: '/templates/chinese/009.jpg' },
  { id: 'en-001', name: '英文专业', thumbnail: '/templates/english/001.jpg' },
  { id: 'en-002', name: '英文简约', thumbnail: '/templates/english/002.jpg' },
]

// 点击模板
async function selectTemplate(tpl: { id: string; name: string; thumbnail: string }) {
  if (authStore.isAuthenticated) {
    // 已登录，直接创建简历并跳转到编辑器
    const resume = await resumeStore.createResume('新简历', tpl.id)
    if (resume) {
      router.push(`/editor/${resume.id}`)
    }
  } else {
    // 未登录，跳转到登录页面并带上模板参数
    router.push({ path: '/login', query: { template: tpl.id } })
  }
}

async function handleLogin() {
  const success = await authStore.login({
    email: form.email,
    password: form.password,
  })

  if (success) {
    // 检查是否有模板参数
    const templateId = route.query.template as string
    if (templateId) {
      // 创建新简历并跳转到编辑器
      const resume = await resumeStore.createResume('新简历', templateId)
      if (resume) {
        router.push(`/editor/${resume.id}`)
        return
      }
    }

    // 没有模板参数，跳转到重定向页面或仪表盘
    const redirect = route.query.redirect as string
    router.push(redirect || '/dashboard')
  }
}
</script>
