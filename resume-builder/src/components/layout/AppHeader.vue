<template>
  <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-stone-950/70 border-b border-stone-800/50">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <span class="text-stone-950 font-bold text-lg font-serif">R</span>
          </div>
          <span class="font-serif text-xl tracking-tight text-white hidden sm:block">ResumeCraft</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link
          to="/templates"
          class="text-sm text-stone-400 hover:text-white transition-colors"
          active-class="text-amber-400"
        >
          模板中心
        </router-link>
        <router-link
          to="/pricing"
          class="text-sm text-stone-400 hover:text-white transition-colors"
          active-class="text-amber-400"
        >
          定价
        </router-link>
        <router-link
          v-if="authStore.isAuthenticated"
          to="/dashboard"
          class="text-sm text-stone-400 hover:text-white transition-colors"
          active-class="text-amber-400"
        >
          我的简历
        </router-link>
      </nav>

      <!-- Right side -->
      <div class="flex items-center gap-4">
        <template v-if="authStore.isAuthenticated">
          <div class="relative" ref="userMenuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-stone-950 font-semibold text-sm">
                {{ authStore.userNickname.charAt(0) }}
              </div>
              <span class="hidden sm:block">{{ authStore.userNickname }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-stone-900 border border-stone-800 rounded-xl shadow-xl py-1 z-50"
              >
                <router-link
                  to="/dashboard"
                  class="block px-4 py-2.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                  @click="showUserMenu = false"
                >
                  我的简历
                </router-link>
                <div class="border-t border-stone-800"></div>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </transition>
          </div>
        </template>

        <template v-else>
          <router-link
            to="/login"
            class="text-sm text-stone-400 hover:text-white transition-colors"
          >
            登录
          </router-link>
          <router-link
            to="/register"
            class="px-5 py-2 bg-white text-stone-950 text-sm font-medium rounded-full hover:bg-stone-200 transition-all hover:scale-105"
          >
            免费注册
          </router-link>
        </template>

        <!-- Mobile menu button -->
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden p-2 text-stone-400 hover:text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="showMobileMenu" class="md:hidden mt-4 pb-4 border-t border-stone-800">
        <div class="flex flex-col gap-2 pt-4">
          <router-link
            to="/templates"
            class="px-4 py-2 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            @click="showMobileMenu = false"
          >
            模板中心
          </router-link>
          <router-link
            to="/pricing"
            class="px-4 py-2 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            @click="showMobileMenu = false"
          >
            定价
          </router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/dashboard"
            class="px-4 py-2 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            @click="showMobileMenu = false"
          >
            我的简历
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)

// 点击外部关闭用户菜单
function handleClickOutside(event: MouseEvent) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false
  }
}

// 退出登录
async function handleLogout() {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
