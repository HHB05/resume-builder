<template>
  <div class="w-60 bg-white border-r border-gray-200 flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-sm font-semibold text-gray-900">简历模块</h3>
    </div>

    <!-- Module List -->
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="module in editorStore.visibleModules"
        :key="module.id"
        :class="[
          'flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors',
          editorStore.activeModule === module.id
            ? 'bg-primary-50 text-primary-700'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
        @click="setActiveModule(module.id)"
        draggable="true"
        @dragstart="onDragStart($event, module.id)"
        @dragover="onDragOver($event)"
        @drop="onDrop($event, module.id)"
        @dragend="onDragEnd"
      >
        <!-- Drag Handle -->
        <div class="mr-2 cursor-move text-gray-400 hover:text-gray-600">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
          </svg>
        </div>

        <!-- Icon -->
        <div class="mr-3">
          <component :is="getModuleIcon(module.id)" class="w-5 h-5" />
        </div>

        <!-- Name -->
        <span class="flex-1 text-sm font-medium">{{ module.title }}</span>

        <!-- Visibility toggle -->
        <button
          @click.stop="toggleVisibility(module.id)"
          class="p-1 text-gray-400 hover:text-gray-600 rounded"
          :title="module.visible ? '隐藏模块' : '显示模块'"
        >
          <svg v-if="module.visible" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="p-4 border-t border-gray-200">
      <button
        @click="addNewSection"
        class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加模块
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useEditorStore } from '@/stores/editor'
import type { ResumeModuleType } from '@/types'

const editorStore = useEditorStore()

// 拖拽状态
let draggedModuleId: ResumeModuleType | null = null

// 获取模块图标
function getModuleIcon(moduleId: ResumeModuleType) {
  const icons: Record<ResumeModuleType, any> = {
    personal: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          })
        ])
      }
    },
    education: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
          })
        ])
      }
    },
    experience: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          })
        ])
      }
    },
    projects: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
          })
        ])
      }
    },
    skills: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
          })
        ])
      }
    },
    summary: {
      render() {
        return h('svg', { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
          h('path', {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
          })
        ])
      }
    },
  }

  return icons[moduleId] || icons.personal
}

// 设置活动模块
function setActiveModule(moduleId: ResumeModuleType) {
  editorStore.setActiveModule(moduleId)
}

// 切换模块可见性
function toggleVisibility(moduleId: ResumeModuleType) {
  editorStore.toggleModuleVisibility(moduleId)
}

// 拖拽开始
function onDragStart(event: DragEvent, moduleId: ResumeModuleType) {
  draggedModuleId = moduleId
  editorStore.setDragging(true)
  event.dataTransfer!.effectAllowed = 'move'
}

// 拖拽经过
function onDragOver(event: DragEvent) {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
}

// 放下
function onDrop(event: DragEvent, targetModuleId: ResumeModuleType) {
  event.preventDefault()

  if (draggedModuleId && draggedModuleId !== targetModuleId) {
    const modules = [...editorStore.visibleModules.map(m => m.id)]
    const fromIndex = modules.indexOf(draggedModuleId)
    const toIndex = modules.indexOf(targetModuleId)

    if (fromIndex !== -1 && toIndex !== -1) {
      modules.splice(fromIndex, 1)
      modules.splice(toIndex, 0, draggedModuleId)
      editorStore.reorderModules(modules)
    }
  }

  draggedModuleId = null
  editorStore.setDragging(false)
}

// 拖拽结束
function onDragEnd() {
  draggedModuleId = null
  editorStore.setDragging(false)
}

// 添加新模块
function addNewSection() {
  // TODO: 实现添加自定义模块功能
  console.log('Add new section')
}
</script>
