import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Template, TemplateFilter, TemplateCategory, TemplateStyle } from '@/types'
import { templateService } from '@/services/template.service'

export const useTemplateStore = defineStore('template', () => {
  // 状态
  const templates = ref<Template[]>([])
  const selectedTemplate = ref<Template | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<TemplateFilter>({})
  const categories = ref<{ id: TemplateCategory; name: string; count: number }[]>([])

  // 计算属性
  const filteredTemplates = computed(() => {
    let result = templates.value

    if (filters.value.category) {
      result = result.filter((t) => t.category === filters.value.category)
    }

    if (filters.value.style) {
      result = result.filter((t) => t.style === filters.value.style)
    }

    if (filters.value.isPremium !== undefined) {
      result = result.filter((t) => t.isPremium === filters.value.isPremium)
    }

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      )
    }

    return result
  })

  const freeTemplates = computed(() =>
    templates.value.filter((t) => !t.isPremium)
  )

  const premiumTemplates = computed(() =>
    templates.value.filter((t) => t.isPremium)
  )

  const templatesByCategory = computed(() => {
    const grouped: Record<string, Template[]> = {}
    templates.value.forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = []
      }
      grouped[t.category].push(t)
    })
    return grouped
  })

  const popularTemplates = computed(() =>
    [...templates.value].sort((a, b) => b.downloadCount - a.downloadCount).slice(0, 10)
  )

  const topRatedTemplates = computed(() =>
    [...templates.value].sort((a, b) => b.rating - a.rating).slice(0, 10)
  )

  // 加载模板列表
  async function fetchTemplates(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const result = await templateService.getTemplates()
      templates.value = result
    } catch (e: any) {
      error.value = e.message || '加载模板失败'
    } finally {
      loading.value = false
    }
  }

  // 加载单个模板
  async function fetchTemplate(id: string): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const template = await templateService.getTemplate(id)
      selectedTemplate.value = template
    } catch (e: any) {
      error.value = e.message || '加载模板失败'
    } finally {
      loading.value = false
    }
  }

  // 设置筛选条件
  function setFilters(newFilters: TemplateFilter) {
    filters.value = { ...filters.value, ...newFilters }
  }

  // 清除筛选条件
  function clearFilters() {
    filters.value = {}
  }

  // 选择模板
  function selectTemplate(template: Template) {
    selectedTemplate.value = template
  }

  // 评分模板
  async function rateTemplate(id: string, score: number, comment?: string): Promise<void> {
    try {
      await templateService.rateTemplate(id, score, comment)
      // 更新本地模板数据
      const template = templates.value.find((t) => t.id === id)
      if (template) {
        const totalRating = template.rating * template.ratingCount + score
        template.ratingCount += 1
        template.rating = totalRating / template.ratingCount
      }
    } catch (e: any) {
      error.value = e.message || '评分失败'
    }
  }

  // 重置模板状态
  function resetTemplate() {
    selectedTemplate.value = null
    filters.value = {}
  }

  return {
    // 状态
    templates,
    selectedTemplate,
    loading,
    error,
    filters,
    categories,

    // 计算属性
    filteredTemplates,
    freeTemplates,
    premiumTemplates,
    templatesByCategory,
    popularTemplates,
    topRatedTemplates,

    // 方法
    fetchTemplates,
    fetchTemplate,
    setFilters,
    clearFilters,
    selectTemplate,
    rateTemplate,
    resetTemplate,
  }
})
