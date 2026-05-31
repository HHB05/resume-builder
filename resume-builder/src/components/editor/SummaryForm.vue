<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-gray-900">自我评价</h2>
      <p class="text-sm text-gray-500 mt-1">简要介绍您的专业背景和职业目标</p>
    </div>

    <!-- Summary textarea -->
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        个人简介
      </label>
      <textarea
        v-model="summary"
        @input="updateSummary"
        rows="6"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        placeholder="例如：3年前端开发经验，精通Vue.js生态系统，熟悉React、Node.js等技术栈。曾主导多个大型项目的前端架构设计，对性能优化和用户体验有深入理解。"
      ></textarea>
      <div class="mt-2 flex items-center justify-between">
        <p class="text-xs text-gray-500">
          建议 100-300 字，突出您的核心优势和职业目标
        </p>
        <span class="text-xs text-gray-500">{{ summary.length }} 字</span>
      </div>
    </div>

    <!-- AI Generate -->
    <div class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-900">AI 智能生成</h3>
        <button
          @click="generateSummary"
          :disabled="isGenerating"
          class="flex items-center px-3 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <svg
            :class="['w-4 h-4 mr-1', { 'animate-spin': isGenerating }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {{ isGenerating ? '生成中...' : 'AI 生成' }}
        </button>
      </div>

      <p class="text-sm text-gray-600">
        根据您填写的其他信息，AI可以为您生成一份专业的自我评价。您可以在此基础上进行修改。
      </p>

      <!-- Generated suggestions -->
      <div v-if="suggestions.length > 0" class="mt-4 space-y-3">
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
          @click="applySuggestion(suggestion)"
        >
          <p class="text-sm text-gray-700">{{ suggestion }}</p>
          <p class="text-xs text-primary-600 mt-2">点击应用此建议</p>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h4 class="text-sm font-medium text-blue-900">撰写技巧</h4>
          <ul class="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
            <li>突出您的核心技能和经验</li>
            <li>使用具体数据量化成就</li>
            <li>针对目标职位定制内容</li>
            <li>保持简洁，避免冗余</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useResumeStore } from '@/stores/resume'

const resumeStore = useResumeStore()

const summary = ref('')
const isGenerating = ref(false)
const suggestions = ref<string[]>([])

// 初始化
watch(
  () => resumeStore.resumeContent.summary,
  (newSummary) => {
    summary.value = newSummary
  },
  { immediate: true }
)

// 更新自我评价
function updateSummary() {
  resumeStore.updateSummary(summary.value)
}

// AI 生成自我评价
async function generateSummary() {
  isGenerating.value = true

  // TODO: 调用AI服务生成自我评价
  // 模拟生成过程
  await new Promise(resolve => setTimeout(resolve, 2000))

  // 模拟生成的建议
  suggestions.value = [
    '拥有3年前端开发经验，精通Vue.js、React等主流框架。曾主导多个大型项目的前端架构设计，在性能优化方面有丰富经验。善于团队协作，具备良好的沟通能力和问题解决能力。',
    '专注于前端开发领域，熟练掌握Vue.js生态系统及相关技术栈。具备扎实的计算机基础，对Web性能优化有深入研究。工作认真负责，乐于学习新技术，追求代码质量和用户体验。',
  ]

  isGenerating.value = false
}

// 应用建议
function applySuggestion(suggestion: string) {
  summary.value = suggestion
  updateSummary()
  suggestions.value = []
}
</script>
