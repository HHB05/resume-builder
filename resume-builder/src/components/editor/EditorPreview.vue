<template>
  <div class="w-1/2 bg-stone-950 border-l border-stone-800 flex flex-col">
    <!-- Preview Header -->
    <div class="bg-stone-900 border-b border-stone-800 px-4 py-2.5 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium text-stone-300">预览</span>
        <div class="flex items-center space-x-1 bg-stone-800 rounded-lg p-1">
          <button
            @click="editorStore.setPreviewMode('pc')"
            :class="[
              'px-2.5 py-1 text-xs font-medium rounded transition-all',
              editorStore.previewMode === 'pc'
                ? 'bg-stone-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            ]"
          >
            PC
          </button>
          <button
            @click="editorStore.setPreviewMode('tablet')"
            :class="[
              'px-2.5 py-1 text-xs font-medium rounded transition-all',
              editorStore.previewMode === 'tablet'
                ? 'bg-stone-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            ]"
          >
            平板
          </button>
          <button
            @click="editorStore.setPreviewMode('mobile')"
            :class="[
              'px-2.5 py-1 text-xs font-medium rounded transition-all',
              editorStore.previewMode === 'mobile'
                ? 'bg-stone-700 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            ]"
          >
            手机
          </button>
        </div>
      </div>

      <!-- Zoom controls -->
      <div class="flex items-center space-x-2">
        <button
          @click="editorStore.zoomOut"
          class="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
          </svg>
        </button>
        <span class="text-sm text-stone-400 w-12 text-center">{{ editorStore.previewZoom }}%</span>
        <button
          @click="editorStore.zoomIn"
          class="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          @click="editorStore.resetZoom"
          class="text-xs text-stone-500 hover:text-stone-300 transition-colors"
        >
          重置
        </button>
      </div>
    </div>

    <!-- Preview Content -->
    <div class="flex-1 overflow-auto p-6 flex justify-center">
      <div
        :style="{
          transform: `scale(${editorStore.previewZoom / 100})`,
          transformOrigin: 'top center',
        }"
      >
        <PreviewRenderer
          :content="resumeStore.resumeContent"
          :template-id="resumeStore.templateId"
          :preview-mode="editorStore.previewMode"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '@/stores/resume'
import { useEditorStore } from '@/stores/editor'
import PreviewRenderer from '@/components/preview/PreviewRenderer.vue'

const resumeStore = useResumeStore()
const editorStore = useEditorStore()
</script>
