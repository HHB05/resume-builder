<template>
  <div class="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-40 flex flex-col">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">选择模板</h3>
      <button
        @click="editorStore.toggleTemplatePanel"
        class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Filters -->
    <div class="px-4 py-3 border-b border-gray-200">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in styles"
          :key="style.value"
          @click="selectedStyle = style.value"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            selectedStyle === style.value
              ? 'bg-primary-100 text-primary-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ style.label }}
        </button>
      </div>
    </div>

    <!-- Template list -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          :class="[
            'relative rounded-lg border-2 cursor-pointer transition-all',
            resumeStore.templateId === template.id
              ? 'border-primary-500 ring-2 ring-primary-200'
              : 'border-gray-200 hover:border-gray-300'
          ]"
          @click="selectTemplate(template)"
        >
          <!-- Template preview -->
          <div class="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
            <div
              class="w-full h-full p-2"
              :style="{ backgroundColor: template.config.primaryColor + '10' }"
            >
              <div class="w-full h-1/4 rounded" :style="{ backgroundColor: template.config.primaryColor }"></div>
              <div class="mt-2 space-y-1">
                <div class="w-3/4 h-1 bg-gray-300 rounded"></div>
                <div class="w-1/2 h-1 bg-gray-300 rounded"></div>
              </div>
              <div class="mt-2 space-y-1">
                <div class="w-full h-1 bg-gray-200 rounded"></div>
                <div class="w-5/6 h-1 bg-gray-200 rounded"></div>
                <div class="w-4/6 h-1 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Template info -->
          <div class="p-3">
            <h4 class="text-sm font-medium text-gray-900">{{ template.name }}</h4>
            <div class="flex items-center mt-1">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  template.isPremium
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                ]"
              >
                {{ template.isPremium ? '专业版' : '免费' }}
              </span>
              <span class="text-xs text-gray-500 ml-2">
                {{ formatCount(template.downloadCount) }} 使用
              </span>
            </div>
          </div>

          <!-- Selected indicator -->
          <div
            v-if="resumeStore.templateId === template.id"
            class="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-gray-200">
      <button
        @click="editorStore.toggleTemplatePanel"
        class="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        完成
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import { useEditorStore } from '@/stores/editor'
import { templates } from '@/data/templates'
import type { Template } from '@/types'

const resumeStore = useResumeStore()
const editorStore = useEditorStore()

const selectedStyle = ref<string>('all')

const styles = [
  { label: '全部', value: 'all' },
  { label: '简约', value: 'minimal' },
  { label: '商务', value: 'business' },
  { label: '创意', value: 'creative' },
]

const filteredTemplates = computed(() => {
  if (selectedStyle.value === 'all') {
    return templates
  }
  return templates.filter(t => t.style === selectedStyle.value)
})

function selectTemplate(template: Template) {
  resumeStore.updateTemplate(template.id)
}

function formatCount(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}
</script>
