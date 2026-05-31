<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">简历制作平台</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/templates"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            active-class="text-primary-600"
          >
            模板中心
          </router-link>
          <router-link
            to="/pricing"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            active-class="text-primary-600"
          >
            定价
          </router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/dashboard"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            active-class="text-primary-600"
          >
            我的简历
          </router-link>
        </nav>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- User menu -->
          <template v-if="authStore.isAuthenticated">
            <div class="relative" ref="userMenuRef">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="text-sm font-medium text-primary-600">
                    {{ authStore.userNickname.charAt(0) }}
                  </span>
                </div>
                <span class="hidden sm:block text-sm font-medium">{{ authStore.userNickname }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    我的简历
                  </router-link>
                  <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    账号设置
                  </router-link>
                  <div class="border-t border-gray-100"></div>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    退出登录
                  </button>
                </div>
              </transition>
            </div>
          </template>

          <!-- Guest menu -->
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              登录
            </router-link>
            <router-link
              to="/register"
              class="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              免费注册
            </router-link>
          </template>

          <!-- Mobile menu button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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
      <div v-if="showMobileMenu" class="md:hidden bg-white border-b border-gray-200">
        <div class="px-4 pt-2 pb-3 space-y-1">
          <router-link
            to="/templates"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            @click="showMobileMenu = false"
          >
            模板中心
          </router-link>
          <router-link
            to="/pricing"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            @click="showMobileMenu = false"
          >
            定价
          </router-link>
          <router-link
            v-if="authStore.isAuthenticated"
            to="/dashboard"
            class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            @click="showMobileMenu = false"
          >
            我的简历
          </router-link>
        </div>
      </div>
    </transition>
  </header>
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
