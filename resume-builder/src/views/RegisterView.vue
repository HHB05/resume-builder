<template>
  <div class="min-h-screen bg-stone-950 flex">
    <!-- Left side - Branding -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div class="relative z-10 flex flex-col justify-center px-16">
        <div class="flex items-center gap-3 mb-12">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-xl">R</span>
          </div>
          <span class="font-serif text-2xl">ResumeCraft</span>
        </div>

        <h1 class="text-5xl font-serif leading-tight tracking-tight mb-6">
          开始您的<br>
          <span class="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            职业新篇章
          </span>
        </h1>

        <p class="text-lg text-stone-400 max-w-md">
          注册即可获得免费模板和 AI 体验额度
        </p>

        <div class="mt-16 space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span class="text-amber-400">✓</span>
            </div>
            <span class="text-stone-400">3 套免费模板</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span class="text-amber-400">✓</span>
            </div>
            <span class="text-stone-400">每日 5 次 AI 润色</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <span class="text-amber-400">✓</span>
            </div>
            <span class="text-stone-400">PDF 导出</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Register form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-md">
        <!-- Mobile logo -->
        <div class="lg:hidden flex items-center gap-3 mb-12 justify-center">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-lg">R</span>
          </div>
          <span class="font-serif text-xl">ResumeCraft</span>
        </div>

        <div class="space-y-8">
          <div>
            <h2 class="text-3xl font-serif tracking-tight">创建账号</h2>
            <p class="text-stone-500 mt-2">免费注册，开始制作专业简历</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-stone-400 mb-2">昵称</label>
                <input
                  v-model="form.nickname"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="请输入昵称"
                />
              </div>

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
                  placeholder="请输入密码（至少6位）"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-stone-400 mb-2">确认密码</label>
                <input
                  v-model="form.confirmPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  placeholder="请再次输入密码"
                />
              </div>
            </div>

            <div class="flex items-start gap-3">
              <input
                v-model="form.agreeTerms"
                type="checkbox"
                required
                class="w-4 h-4 mt-1 rounded border-stone-700 bg-stone-800 text-amber-500 focus:ring-amber-500"
              />
              <span class="text-sm text-stone-400">
                我已阅读并同意
                <a href="#" class="text-amber-400 hover:text-amber-300">服务条款</a>
                和
                <a href="#" class="text-amber-400 hover:text-amber-300">隐私政策</a>
              </span>
            </div>

            <div v-if="authStore.error" class="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {{ authStore.error }}
            </div>

            <button
              type="submit"
              :disabled="authStore.loading || !form.agreeTerms"
              class="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <svg v-if="authStore.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ authStore.loading ? '注册中...' : '注册' }}
            </button>
          </form>

          <p class="text-center text-stone-500">
            已有账号？
            <router-link to="/login" class="text-amber-400 hover:text-amber-300 transition-colors">立即登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

async function handleRegister() {
  if (form.password !== form.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  if (form.password.length < 6) {
    alert('密码至少需要6位')
    return
  }

  const success = await authStore.register({
    nickname: form.nickname,
    email: form.email,
    password: form.password,
  })

  if (success) {
    router.push('/dashboard')
  }
}
</script>
