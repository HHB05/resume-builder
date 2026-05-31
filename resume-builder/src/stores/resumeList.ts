import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Resume, ResumeStatus, ResumeListParams } from '@/types'
import { resumeService } from '@/services/resume.service'

export const useResumeListStore = defineStore('resumeList', () => {
  // 状态
  const resumes = ref<Resume[]>([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(20)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<{
    search?: string
    status?: ResumeStatus
    sortBy?: 'createdAt' | 'updatedAt' | 'title'
    sortOrder?: 'asc' | 'desc'
  }>({})

  // 计算属性
  const filteredResumes = computed(() => {
    let result = resumes.value

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter((r) => r.title.toLowerCase().includes(search))
    }

    if (filters.value.status) {
      result = result.filter((r) => r.status === filters.value.status)
    }

    return result
  })

  const recentResumes = computed(() =>
    [...resumes.value].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5)
  )

  const favoriteResumes = computed(() =>
    resumes.value.filter((r) => r.isFavorite)
  )

  const draftResumes = computed(() =>
    resumes.value.filter((r) => r.status === 'draft')
  )

  const publishedResumes = computed(() =>
    resumes.value.filter((r) => r.status === 'published')
  )

  const archivedResumes = computed(() =>
    resumes.value.filter((r) => r.status === 'archived')
  )

  const hasMore = computed(() => resumes.value.length < total.value)

  // 加载简历列表
  async function fetchResumes(reset = false): Promise<void> {
    if (reset) {
      page.value = 1
      resumes.value = []
    }

    loading.value = true
    error.value = null

    try {
      const params: ResumeListParams = {
        page: page.value,
        pageSize: pageSize.value,
        ...filters.value,
      }

      const result = await resumeService.getResumes(params)

      if (reset) {
        resumes.value = result.resumes
      } else {
        resumes.value = [...resumes.value, ...result.resumes]
      }

      total.value = result.total
    } catch (e: any) {
      error.value = e.message || '加载简历列表失败'
    } finally {
      loading.value = false
    }
  }

  // 加载更多
  async function loadMore(): Promise<void> {
    if (!hasMore.value || loading.value) return

    page.value += 1
    await fetchResumes()
  }

  // 设置筛选条件
  function setFilters(newFilters: typeof filters.value) {
    filters.value = { ...filters.value, ...newFilters }
    fetchResumes(true)
  }

  // 清除筛选条件
  function clearFilters() {
    filters.value = {}
    fetchResumes(true)
  }

  // 搜索简历
  function search(query: string) {
    setFilters({ search: query })
  }

  // 按状态筛选
  function filterByStatus(status: ResumeStatus | undefined) {
    setFilters({ status })
  }

  // 排序
  function sort(sortBy: 'createdAt' | 'updatedAt' | 'title', sortOrder: 'asc' | 'desc' = 'desc') {
    setFilters({ sortBy, sortOrder })
  }

  // 添加简历到列表
  function addResume(resume: Resume) {
    resumes.value.unshift(resume)
    total.value += 1
  }

  // 从列表中移除简历
  function removeResume(id: string) {
    resumes.value = resumes.value.filter((r) => r.id !== id)
    total.value -= 1
  }

  // 更新列表中的简历
  function updateResumeInList(id: string, data: Partial<Resume>) {
    const index = resumes.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      resumes.value[index] = { ...resumes.value[index], ...data }
    }
  }

  // 切换收藏状态
  async function toggleFavorite(id: string): Promise<void> {
    try {
      await resumeService.toggleFavorite(id)
      const resume = resumes.value.find((r) => r.id === id)
      if (resume) {
        resume.isFavorite = !resume.isFavorite
      }
    } catch (e: any) {
      error.value = e.message || '切换收藏状态失败'
    }
  }

  // 删除简历
  async function deleteResume(id: string): Promise<boolean> {
    try {
      await resumeService.deleteResume(id)
      removeResume(id)
      return true
    } catch (e: any) {
      error.value = e.message || '删除简历失败'
      return false
    }
  }

  // 批量删除简历
  async function batchDeleteResumes(ids: string[]): Promise<boolean> {
    try {
      await Promise.all(ids.map((id) => resumeService.deleteResume(id)))
      resumes.value = resumes.value.filter((r) => !ids.includes(r.id))
      total.value -= ids.length
      return true
    } catch (e: any) {
      error.value = e.message || '批量删除失败'
      return false
    }
  }

  // 重置简历列表
  function resetResumeList() {
    resumes.value = []
    total.value = 0
    page.value = 1
    filters.value = {}
    error.value = null
  }

  return {
    // 状态
    resumes,
    total,
    page,
    pageSize,
    loading,
    error,
    filters,

    // 计算属性
    filteredResumes,
    recentResumes,
    favoriteResumes,
    draftResumes,
    publishedResumes,
    archivedResumes,
    hasMore,

    // 方法
    fetchResumes,
    loadMore,
    setFilters,
    clearFilters,
    search,
    filterByStatus,
    sort,
    addResume,
    removeResume,
    updateResumeInList,
    toggleFavorite,
    deleteResume,
    batchDeleteResumes,
    resetResumeList,
  }
})
