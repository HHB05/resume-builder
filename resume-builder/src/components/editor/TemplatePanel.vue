<template>
  <div class="fixed inset-y-0 right-0 w-96 bg-stone-900 shadow-xl z-40 flex flex-col border-l border-stone-800">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-stone-800 flex items-center justify-between">
      <h3 class="text-lg font-semibold text-white">选择模板</h3>
      <button
        @click="editorStore.toggleTemplatePanel"
        class="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Filters -->
    <div class="px-4 py-3 border-b border-stone-800">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="style in styles"
          :key="style.value"
          @click="selectedStyle = style.value"
          :class="[
            'px-3 py-1 text-sm rounded-full transition-colors',
            selectedStyle === style.value
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border border-transparent'
          ]"
        >
          {{ style.label }}
        </button>
      </div>
    </div>

    <!-- Template list -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid grid-cols-2 gap-3">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          :class="[
            'relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden',
            resumeStore.templateId === template.id
              ? 'border-amber-500 ring-2 ring-amber-500/30'
              : 'border-stone-700 hover:border-stone-600'
          ]"
          @click="selectTemplate(template)"
        >
          <!-- Template preview -->
          <div class="aspect-[3/4] bg-stone-800 overflow-hidden">
            <img
              v-if="template.thumbnailUrl"
              :src="template.thumbnailUrl"
              :alt="template.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full p-3 flex flex-col">
              <div class="w-full h-1/4 rounded mb-2" :style="{ backgroundColor: template.config.primaryColor }"></div>
              <div class="space-y-1">
                <div class="w-3/4 h-1 bg-stone-600 rounded"></div>
                <div class="w-1/2 h-1 bg-stone-600 rounded"></div>
              </div>
              <div class="mt-2 space-y-1">
                <div class="w-full h-1 bg-stone-700 rounded"></div>
                <div class="w-5/6 h-1 bg-stone-700 rounded"></div>
                <div class="w-4/6 h-1 bg-stone-700 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Template info -->
          <div class="p-2.5 bg-stone-800">
            <h4 class="text-xs font-medium text-white truncate">{{ template.name }}</h4>
            <div class="flex items-center mt-1">
              <span
                :class="[
                  'text-xs px-1.5 py-0.5 rounded',
                  template.isPremium
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                ]"
              >
                {{ template.isPremium ? 'PRO' : '免费' }}
              </span>
            </div>
          </div>

          <!-- Selected indicator -->
          <div
            v-if="resumeStore.templateId === template.id"
            class="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
          >
            <svg class="w-3 h-3 text-stone-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-4 py-3 border-t border-stone-800">
      <button
        @click="editorStore.toggleTemplatePanel"
        class="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
      >
        完成选择
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
  { label: '中文', value: 'chinese' },
  { label: '英文', value: 'english' },
]

const filteredTemplates = computed(() => {
  if (selectedStyle.value === 'all') {
    return templates
  }
  if (selectedStyle.value === 'chinese') {
    return templates.filter(t => t.id.startsWith('cn-'))
  }
  if (selectedStyle.value === 'english') {
    return templates.filter(t => t.id.startsWith('en-'))
  }
  return templates.filter(t => t.style === selectedStyle.value)
})

function selectTemplate(template: Template) {
  resumeStore.updateTemplate(template.id)
}
</script>
