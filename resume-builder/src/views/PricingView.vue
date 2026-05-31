<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900">选择适合您的方案</h1>
        <p class="mt-2 text-lg text-gray-600">灵活的定价，满足不同需求</p>
      </div>

      <!-- Pricing cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <!-- Free -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 class="text-lg font-semibold text-gray-900">免费版</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-gray-900">¥0</span>
            <span class="text-gray-500">/永久</span>
          </div>
          <p class="mt-4 text-sm text-gray-600">适合偶尔使用的基础用户</p>

          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">3套免费模板</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">PDF导出</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">基础AI建议（每日5次）</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-sm text-gray-400">AI深度润色</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="text-sm text-gray-400">简历评分</span>
            </li>
          </ul>

          <button class="mt-8 w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            开始使用
          </button>
        </div>

        <!-- Pro -->
        <div class="bg-white rounded-2xl shadow-lg border-2 border-primary-500 p-8 relative">
          <div class="absolute top-0 right-0 -mt-4 -mr-4 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            推荐
          </div>
          <h3 class="text-lg font-semibold text-gray-900">专业版</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-gray-900">¥29</span>
            <span class="text-gray-500">/月</span>
          </div>
          <p class="mt-4 text-sm text-gray-600">适合求职者和职场人士</p>

          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">全部模板</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">多格式导出</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">AI深度润色（无限次）</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">简历评分与分析</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">在线分享</span>
            </li>
          </ul>

          <button class="mt-8 w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
            立即订阅
          </button>
        </div>

        <!-- Enterprise -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 class="text-lg font-semibold text-gray-900">企业版</h3>
          <div class="mt-4">
            <span class="text-4xl font-bold text-gray-900">定制</span>
          </div>
          <p class="mt-4 text-sm text-gray-600">适合团队和企业用户</p>

          <ul class="mt-8 space-y-4">
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">全部专业版功能</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">团队管理</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">品牌定制模板</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">API接入</span>
            </li>
            <li class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-sm text-gray-600">专属客服支持</span>
            </li>
          </ul>

          <button class="mt-8 w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            联系销售
          </button>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { AppHeader, AppFooter } from '@/components/layout'
</script>
