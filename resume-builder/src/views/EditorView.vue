<template>
  <div class="h-screen flex flex-col bg-stone-950">
    <!-- Top Toolbar -->
    <EditorToolbar />

    <!-- Main Content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Panel: Module List -->
      <EditorModulePanel />

      <!-- Center: Edit Area -->
      <EditorWorkArea />

      <!-- Right Panel: Preview -->
      <EditorPreview v-if="editorStore.showPreview" />
    </div>

    <!-- Bottom Status Bar -->
    <EditorStatusBar />

    <!-- AI Assistant Panel -->
    <AiAssistantPanel v-if="editorStore.showAiPanel" />

    <!-- Template Panel -->
    <TemplatePanel v-if="editorStore.showTemplatePanel" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'
import { useEditorStore } from '@/stores/editor'
import EditorToolbar from '@/components/editor/EditorToolbar.vue'
import EditorModulePanel from '@/components/editor/EditorModulePanel.vue'
import EditorWorkArea from '@/components/editor/EditorWorkArea.vue'
import EditorPreview from '@/components/editor/EditorPreview.vue'
import EditorStatusBar from '@/components/editor/EditorStatusBar.vue'
import AiAssistantPanel from '@/components/ai/AiAssistantPanel.vue'
import TemplatePanel from '@/components/editor/TemplatePanel.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const resumeStore = useResumeStore()
const editorStore = useEditorStore()

// 认证检查
onMounted(async () => {
  // 检查是否已登录
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: route.fullPath } })
    return
  }

  // 加载简历
  const id = route.params.id as string
  const templateId = route.query.template as string || 'cn-001'

  if (id) {
    const success = await resumeStore.loadResume(id)
    if (!success) {
      router.push('/dashboard')
    }
  } else {
    // 创建新简历，使用指定的模板
    const resume = await resumeStore.createResume('新简历', templateId)
    if (resume) {
      router.replace(`/editor/${resume.id}`)
    }
  }
})

// 自动保存
let autoSaveTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  autoSaveTimer = setInterval(() => {
    if (resumeStore.isDirty && !resumeStore.isSaving) {
      resumeStore.saveResume()
    }
  }, 30000) // 每30秒自动保存
})

onUnmounted(() => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }
})

// 键盘快捷键
function handleKeydown(e: KeyboardEvent) {
  // Ctrl+S 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    resumeStore.saveResume()
  }

  // Ctrl+Z 撤销
  if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
    e.preventDefault()
    // TODO: 实现撤销功能
  }

  // Ctrl+Y 或 Ctrl+Shift+Z 重做
  if (((e.ctrlKey || e.metaKey) && e.key === 'y') ||
      ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
    e.preventDefault()
    // TODO: 实现重做功能
  }

  // Ctrl+E 导出
  if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
    e.preventDefault()
    // TODO: 打开导出对话框
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// 监听路由变化
watch(() => route.params.id, async (newId) => {
  if (newId && typeof newId === 'string') {
    await resumeStore.loadResume(newId)
  }
})
</script>
