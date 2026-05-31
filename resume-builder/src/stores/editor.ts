import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ResumeModuleType, ResumeModule } from '@/types'

// 默认模块顺序
const defaultModules: ResumeModule[] = [
  { id: 'personal', title: '个人信息', icon: 'user', order: 0, visible: true },
  { id: 'education', title: '教育经历', icon: 'education', order: 1, visible: true },
  { id: 'experience', title: '工作经验', icon: 'briefcase', order: 2, visible: true },
  { id: 'projects', title: '项目经历', icon: 'folder', order: 3, visible: true },
  { id: 'skills', title: '技能特长', icon: 'star', order: 4, visible: true },
  { id: 'summary', title: '自我评价', icon: 'comment', order: 5, visible: true },
]

export const useEditorStore = defineStore('editor', () => {
  // 状态
  const activeModule = ref<ResumeModuleType>('personal')
  const modules = ref<ResumeModule[]>([...defaultModules])
  const showAiPanel = ref(false)
  const showPreview = ref(true)
  const previewMode = ref<'pc' | 'tablet' | 'mobile'>('pc')
  const previewZoom = ref(100)
  const isDragging = ref(false)
  const isFullscreen = ref(false)
  const showTemplatePanel = ref(false)

  // 计算属性
  const visibleModules = computed(() =>
    modules.value
      .filter((m) => m.visible)
      .sort((a, b) => a.order - b.order)
  )

  const activeModuleData = computed(() =>
    modules.value.find((m) => m.id === activeModule.value)
  )

  const canUndo = ref(false)
  const canRedo = ref(false)

  // 设置活动模块
  function setActiveModule(moduleId: ResumeModuleType) {
    activeModule.value = moduleId
  }

  // 更新模块顺序
  function reorderModules(newOrder: ResumeModuleType[]) {
    const newModules = modules.value.map((m) => ({
      ...m,
      order: newOrder.indexOf(m.id),
    }))
    modules.value = newModules
  }

  // 切换模块可见性
  function toggleModuleVisibility(moduleId: ResumeModuleType) {
    const module = modules.value.find((m) => m.id === moduleId)
    if (module) {
      module.visible = !module.visible
    }
  }

  // 切换AI面板
  function toggleAiPanel() {
    showAiPanel.value = !showAiPanel.value
  }

  // 打开AI面板
  function openAiPanel() {
    showAiPanel.value = true
  }

  // 关闭AI面板
  function closeAiPanel() {
    showAiPanel.value = false
  }

  // 切换预览
  function togglePreview() {
    showPreview.value = !showPreview.value
  }

  // 设置预览模式
  function setPreviewMode(mode: 'pc' | 'tablet' | 'mobile') {
    previewMode.value = mode
  }

  // 设置预览缩放
  function setPreviewZoom(zoom: number) {
    previewZoom.value = Math.max(50, Math.min(200, zoom))
  }

  // 放大预览
  function zoomIn() {
    setPreviewZoom(previewZoom.value + 10)
  }

  // 缩小预览
  function zoomOut() {
    setPreviewZoom(previewZoom.value - 10)
  }

  // 重置缩放
  function resetZoom() {
    previewZoom.value = 100
  }

  // 设置拖拽状态
  function setDragging(dragging: boolean) {
    isDragging.value = dragging
  }

  // 切换全屏
  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value
  }

  // 切换模板面板
  function toggleTemplatePanel() {
    showTemplatePanel.value = !showTemplatePanel.value
  }

  // 设置撤销/重做状态
  function setUndoRedoState(undo: boolean, redo: boolean) {
    canUndo.value = undo
    canRedo.value = redo
  }

  // 重置编辑器状态
  function resetEditor() {
    activeModule.value = 'personal'
    modules.value = [...defaultModules]
    showAiPanel.value = false
    showPreview.value = true
    previewMode.value = 'pc'
    previewZoom.value = 100
    isDragging.value = false
    isFullscreen.value = false
    showTemplatePanel.value = false
    canUndo.value = false
    canRedo.value = false
  }

  return {
    // 状态
    activeModule,
    modules,
    showAiPanel,
    showPreview,
    previewMode,
    previewZoom,
    isDragging,
    isFullscreen,
    showTemplatePanel,
    canUndo,
    canRedo,

    // 计算属性
    visibleModules,
    activeModuleData,

    // 方法
    setActiveModule,
    reorderModules,
    toggleModuleVisibility,
    toggleAiPanel,
    openAiPanel,
    closeAiPanel,
    togglePreview,
    setPreviewMode,
    setPreviewZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    setDragging,
    toggleFullscreen,
    toggleTemplatePanel,
    setUndoRedoState,
    resetEditor,
  }
})
