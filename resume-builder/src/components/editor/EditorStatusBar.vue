<template>
  <div class="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
    <!-- Left side -->
    <div class="flex items-center space-x-4">
      <!-- Word count -->
      <div class="flex items-center text-gray-500">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>{{ resumeStore.wordCount }} 字</span>
      </div>

      <!-- Divider -->
      <div class="w-px h-4 bg-gray-300"></div>

      <!-- Save status -->
      <div class="flex items-center">
        <span v-if="resumeStore.isSaving" class="flex items-center text-yellow-600">
          <svg class="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          保存中...
        </span>
        <span v-else-if="resumeStore.isDirty" class="flex items-center text-orange-600">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          有未保存的更改
        </span>
        <span v-else-if="resumeStore.lastSavedAt" class="flex items-center text-green-600">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          已保存 {{ formatTime(resumeStore.lastSavedAt) }}
        </span>
      </div>
    </div>

    <!-- Center -->
    <div class="flex items-center space-x-4">
      <!-- Score preview -->
      <div v-if="resumeStore.score" class="flex items-center">
        <span class="text-gray-500 mr-1">简历评分：</span>
        <span
          :class="[
            'font-medium',
            resumeStore.score >= 80 ? 'text-green-600' :
            resumeStore.score >= 60 ? 'text-yellow-600' : 'text-red-600'
          ]"
        >
          {{ resumeStore.score }}
        </span>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-4">
      <!-- Keyboard shortcuts -->
      <div class="flex items-center space-x-3 text-gray-500">
        <span class="flex items-center">
          <kbd class="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl+S</kbd>
          <span class="ml-1">保存</span>
        </span>
        <span class="flex items-center">
          <kbd class="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl+Z</kbd>
          <span class="ml-1">撤销</span>
        </span>
        <span class="flex items-center">
          <kbd class="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl+E</kbd>
          <span class="ml-1">导出</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'

const resumeStore = useResumeStore()

// 格式化时间
function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 60000) {
    return '刚刚'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)} 分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)} 小时前`
  } else {
    return new Date(timestamp).toLocaleDateString('zh-CN')
  }
}
</script>
