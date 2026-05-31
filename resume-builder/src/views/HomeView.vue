<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI驱动的
            <span class="text-primary-600">专业简历</span>
            制作平台
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            告别繁琐的简历制作流程，让AI帮助您打造一份出色的简历。
            专业模板、智能优化、一键导出，让求职更简单。
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/register"
              class="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-lg"
            >
              免费开始制作
            </router-link>
            <router-link
              to="/templates"
              class="px-8 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-lg"
            >
              浏览模板
            </router-link>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="mt-16 relative">
          <div class="bg-white rounded-2xl shadow-2xl p-4 max-w-4xl mx-auto">
            <div class="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
              <div class="text-center">
                <svg class="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-400 mt-4">简历编辑器预览</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">为什么选择我们</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            我们提供一站式简历制作解决方案，让您的简历脱颖而出
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.id" class="text-center p-6">
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">精选模板</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            专业设计师精心打造，覆盖各行各业
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="template in templates"
            :key="template.id"
            class="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div class="aspect-[3/4] bg-gray-100 p-3">
              <div class="w-full h-full rounded bg-gradient-to-br from-primary-50 to-primary-100"></div>
            </div>
            <div class="p-3">
              <h4 class="font-medium text-gray-900 text-sm">{{ template.name }}</h4>
              <p class="text-xs text-gray-500 mt-1">{{ template.uses }} 次使用</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link
            to="/templates"
            class="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-200 hover:bg-primary-50 transition-colors"
          >
            查看全部模板
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-primary-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-4xl font-bold text-white mb-2">{{ stat.value }}</div>
            <div class="text-primary-100">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">准备好开始了吗？</h2>
        <p class="text-lg text-gray-600 mb-8">
          立即注册，免费制作您的专业简历
        </p>
        <router-link
          to="/register"
          class="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-lg"
        >
          免费注册
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { AppHeader, AppFooter } from '@/components/layout'

const features = [
  {
    id: 1,
    title: 'AI智能优化',
    description: 'AI助手帮您润色内容、优化表达，让简历更专业',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    id: 2,
    title: '专业模板',
    description: '精心设计的模板，覆盖各行各业，一键切换',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  },
  {
    id: 3,
    title: '一键导出',
    description: '支持PDF、Word等多种格式导出，随时投递',
    icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
  },
]

const templates = [
  { id: 1, name: '简约风格', uses: '12.3k' },
  { id: 2, name: '商务专业', uses: '9.8k' },
  { id: 3, name: '创意设计', uses: '6.5k' },
  { id: 4, name: '技术岗位', uses: '15.2k' },
]

const stats = [
  { value: '10万+', label: '用户信赖' },
  { value: '50万+', label: '简历创建' },
  { value: '30+', label: '专业模板' },
  { value: '98%', label: '好评率' },
]
</script>
