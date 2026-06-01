<template>
  <div class="w-64 bg-stone-900/80 border-r border-stone-800 flex flex-col">
    <!-- Header -->
    <div class="p-5 border-b border-stone-800">
      <h3 class="text-sm font-semibold text-stone-300 tracking-wide uppercase">简历模块</h3>
    </div>

    <!-- Module List -->
    <div class="flex-1 overflow-y-auto p-3 space-y-1">
      <div
        v-for="(module, index) in editorStore.visibleModules"
        :key="module.id"
        :class="[
          'group flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200',
          editorStore.activeModule === module.id
            ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30'
            : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200 border border-transparent'
        ]"
        :style="{ animationDelay: `${index * 50}ms` }"
        @click="setActiveModule(module.id)"
        draggable="true"
        @dragstart="onDragStart($event, module.id)"
        @dragover="onDragOver($event)"
        @drop="onDrop($event, module.id)"
        @dragend="onDragEnd"
      >
        <!-- Drag Handle -->
        <div class="mr-2.5 cursor-move text-stone-600 group-hover:text-stone-400 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
          </svg>
        </div>

        <!-- Icon -->
        <div class="mr-3 text-lg">{{ getModuleEmoji(module.id) }}</div>

        <!-- Name -->
        <span class="flex-1 text-sm font-medium">{{ module.title }}</span>

        <!-- Visibility toggle -->
        <button
          @click.stop="toggleVisibility(module.id)"
          class="p-1.5 text-stone-600 hover:text-stone-300 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
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
    <div class="p-4 border-t border-stone-800">
      <button
        @click="addNewSection"
        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl transition-all border border-amber-500/20"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加模块
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import type { ResumeModuleType } from '@/types'

const editorStore = useEditorStore()

// 拖拽状态
let draggedModuleId: ResumeModuleType | null = null

// 获取模块图标
function getModuleEmoji(moduleId: ResumeModuleType): string {
  const emojis: Record<ResumeModuleType, string> = {
    personal: '👤',
    education: '🎓',
    experience: '💼',
    projects: '🚀',
    skills: '⚡',
    summary: '📝',
  }
  return emojis[moduleId] || '📄'
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
