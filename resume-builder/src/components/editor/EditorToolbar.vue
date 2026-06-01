<template>
  <div class="bg-stone-900 border-b border-stone-800 px-4 py-2 flex items-center justify-between">
    <!-- Left side -->
    <div class="flex items-center space-x-4">
      <!-- Back button -->
      <button
        @click="goBack"
        class="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
        title="返回"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <!-- Divider -->
      <div class="w-px h-6 bg-stone-700"></div>

      <!-- Undo/Redo -->
      <div class="flex items-center space-x-1">
        <button
          @click="undo"
          :disabled="!editorStore.canUndo"
          class="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="撤销 (Ctrl+Z)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button
          @click="redo"
          :disabled="!editorStore.canRedo"
          class="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="重做 (Ctrl+Y)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="w-px h-6 bg-stone-700"></div>

      <!-- Title -->
      <input
        v-model="resumeTitle"
        @blur="updateTitle"
        class="text-lg font-medium text-white border-none focus:ring-0 focus:outline-none bg-transparent"
        placeholder="输入简历标题"
      />
    </div>

    <!-- Center -->
    <div class="flex items-center space-x-2">
      <!-- Template -->
      <button
        @click="editorStore.toggleTemplatePanel"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          editorStore.showTemplatePanel
            ? 'bg-amber-500/20 text-amber-400'
            : 'text-stone-400 hover:text-white hover:bg-stone-800'
        ]"
      >
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        模板
      </button>

      <!-- AI Assistant -->
      <button
        @click="editorStore.toggleAiPanel"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          editorStore.showAiPanel
            ? 'bg-purple-500/20 text-purple-400'
            : 'text-stone-400 hover:text-white hover:bg-stone-800'
        ]"
      >
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        AI助手
      </button>

      <!-- Preview toggle -->
      <button
        @click="editorStore.togglePreview"
        :class="[
          'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          editorStore.showPreview
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'text-stone-400 hover:text-white hover:bg-stone-800'
        ]"
      >
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        预览
      </button>
    </div>

    <!-- Right side -->
    <div class="flex items-center space-x-2">
      <!-- Save status -->
      <div class="text-sm text-stone-500 mr-2">
        <span v-if="resumeStore.isSaving">保存中...</span>
        <span v-else-if="resumeStore.isDirty">有未保存的更改</span>
        <span v-else-if="resumeStore.lastSavedAt">已保存</span>
      </div>

      <!-- Save button -->
      <button
        @click="save"
        :disabled="!resumeStore.isDirty || resumeStore.isSaving"
        class="px-4 py-2 text-sm font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        保存
      </button>

      <!-- Export -->
      <div class="relative" ref="exportMenuRef">
        <button
          @click="showExportMenu = !showExportMenu"
          class="px-4 py-2 text-sm font-medium text-stone-950 bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-lg hover:shadow-amber-500/25 rounded-lg transition-all"
        >
          <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          导出
          <svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Export dropdown -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="showExportMenu"
            class="absolute right-0 mt-2 w-48 bg-stone-900 border border-stone-800 rounded-xl shadow-xl py-1 z-50"
          >
            <button
              @click="exportPdf"
              class="block w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <svg class="w-4 h-4 inline-block mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              导出 PDF
            </button>
            <button
              @click="exportDocx"
              class="block w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <svg class="w-4 h-4 inline-block mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出 Word
            </button>
            <button
              @click="exportImage"
              class="block w-full text-left px-4 py-2.5 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <svg class="w-4 h-4 inline-block mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              导出图片
            </button>
          </div>
        </transition>
      </div>

      <!-- Share -->
      <button
        @click="share"
        class="px-4 py-2 text-sm font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        分享
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resume'
import { useEditorStore } from '@/stores/editor'
import { exportService } from '@/services/export.service'

const router = useRouter()
const resumeStore = useResumeStore()
const editorStore = useEditorStore()

const showExportMenu = ref(false)
const exportMenuRef = ref<HTMLElement | null>(null)

const resumeTitle = computed({
  get: () => resumeStore.resumeTitle,
  set: (value) => resumeStore.updateTitle(value),
})

// 返回
function goBack() {
  if (resumeStore.isDirty) {
    if (confirm('有未保存的更改，是否保存？')) {
      resumeStore.saveResume().then(() => {
        router.push('/dashboard')
      })
    } else {
      router.push('/dashboard')
    }
  } else {
    router.push('/dashboard')
  }
}

// 撤销
function undo() {
  // TODO: 实现撤销功能
}

// 重做
function redo() {
  // TODO: 实现重做功能
}

// 更新标题
function updateTitle() {
  // 标题已通过 computed set 自动更新
}

// 保存
async function save() {
  await resumeStore.saveResume()
}

// 导出PDF
async function exportPdf() {
  showExportMenu.value = false
  if (!resumeStore.resumeId) return

  try {
    const task = await exportService.exportPdf(resumeStore.resumeId)
    // 轮询任务状态
    const result = await exportService.pollTaskStatus(task.taskId)
    if (result.status === 'completed' && result.downloadUrl) {
      window.open(result.downloadUrl, '_blank')
    }
  } catch (error) {
    console.error('Export PDF failed:', error)
  }
}

// 导出Word
async function exportDocx() {
  showExportMenu.value = false
  if (!resumeStore.resumeId) return

  try {
    const task = await exportService.exportDocx(resumeStore.resumeId)
    const result = await exportService.pollTaskStatus(task.taskId)
    if (result.status === 'completed' && result.downloadUrl) {
      window.open(result.downloadUrl, '_blank')
    }
  } catch (error) {
    console.error('Export DOCX failed:', error)
  }
}

// 导出图片
async function exportImage() {
  showExportMenu.value = false
  if (!resumeStore.resumeId) return

  try {
    const task = await exportService.exportImage(resumeStore.resumeId, 'png')
    const result = await exportService.pollTaskStatus(task.taskId)
    if (result.status === 'completed' && result.downloadUrl) {
      window.open(result.downloadUrl, '_blank')
    }
  } catch (error) {
    console.error('Export image failed:', error)
  }
}

// 分享
function share() {
  // TODO: 实现分享功能
  console.log('Share resume')
}

// 点击外部关闭导出菜单
function handleClickOutside(event: MouseEvent) {
  if (exportMenuRef.value && !exportMenuRef.value.contains(event.target as Node)) {
    showExportMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
