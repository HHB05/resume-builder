<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">工作经验</h2>
        <p class="text-sm text-gray-500 mt-1">从最近的工作开始填写</p>
      </div>
      <button
        @click="addExperience"
        class="flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加工作经验
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="experiences.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无工作经验</h3>
      <p class="mt-1 text-sm text-gray-500">点击上方按钮添加您的工作经历</p>
    </div>

    <!-- Experience entries -->
    <div
      v-for="(exp, index) in experiences"
      :key="exp.id"
      class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-900">工作经历 {{ index + 1 }}</h3>
        <button
          @click="removeExperience(exp.id)"
          class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
          title="删除"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 公司 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            公司名称 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="exp.company"
            @input="updateExperience(exp.id, { company: exp.company })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：字节跳动"
          />
        </div>

        <!-- 职位 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            职位 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="exp.position"
            @input="updateExperience(exp.id, { position: exp.position })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：前端开发工程师"
          />
        </div>

        <!-- 开始时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            开始时间 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="exp.period.start"
            @input="updateExperience(exp.id, { period: exp.period })"
            type="month"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        <!-- 结束时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            结束时间 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="exp.period.end"
            @input="updateExperience(exp.id, { period: exp.period })"
            type="month"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <!-- 工作描述 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          工作描述 <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="exp.description"
          @input="updateExperience(exp.id, { description: exp.description })"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="描述您的工作职责和成就，建议使用STAR法则"
        ></textarea>
        <p class="mt-1 text-xs text-gray-500">
          提示：使用具体数据量化成果，如"提升了30%的转化率"
        </p>
      </div>

      <!-- 工作亮点 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          工作亮点
        </label>
        <div class="space-y-2">
          <div
            v-for="(highlight, hIndex) in exp.highlights"
            :key="hIndex"
            class="flex items-center gap-2"
          >
            <input
              v-model="exp.highlights[hIndex]"
              @input="updateExperience(exp.id, { highlights: exp.highlights })"
              type="text"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
              placeholder="如：主导重构了播放器组件，性能提升40%"
            />
            <button
              @click="removeHighlight(exp.id, hIndex)"
              class="p-2 text-gray-400 hover:text-red-500 rounded transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            @click="addHighlight(exp.id)"
            class="flex items-center text-sm text-primary-600 hover:text-primary-700"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            添加亮点
          </button>
        </div>
      </div>

      <!-- AI 助手 -->
      <div class="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <div class="flex items-center">
          <svg class="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-sm text-purple-700">点击工作描述区域，使用AI助手润色内容</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { ExperienceEntry } from '@/types'

const resumeStore = useResumeStore()

const experiences = computed(() => resumeStore.resumeContent.experience)

// 添加工作经验
function addExperience() {
  resumeStore.addExperience({
    company: '',
    position: '',
    period: { start: '', end: '' },
    description: '',
    highlights: [],
  })
}

// 更新工作经验
function updateExperience(id: string, data: Partial<ExperienceEntry>) {
  resumeStore.updateExperience(id, data)
}

// 删除工作经验
function removeExperience(id: string) {
  if (confirm('确定要删除这条工作经历吗？')) {
    resumeStore.removeExperience(id)
  }
}

// 添加工作亮点
function addHighlight(expId: string) {
  const exp = experiences.value.find(e => e.id === expId)
  if (exp) {
    updateExperience(expId, { highlights: [...exp.highlights, ''] })
  }
}

// 删除工作亮点
function removeHighlight(expId: string, index: number) {
  const exp = experiences.value.find(e => e.id === expId)
  if (exp) {
    const newHighlights = [...exp.highlights]
    newHighlights.splice(index, 1)
    updateExperience(expId, { highlights: newHighlights })
  }
}
</script>
