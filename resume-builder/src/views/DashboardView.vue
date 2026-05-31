<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">我的简历</h1>
        <p class="mt-1 text-sm text-gray-600">管理您的所有简历</p>
      </div>

      <!-- Actions -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索简历..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <select
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">全部状态</option>
            <option value="draft">草稿</option>
            <option value="published">已发布</option>
            <option value="archived">已归档</option>
          </select>
        </div>

        <button
          @click="createNewResume"
          class="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          新建简历
        </button>
      </div>

      <!-- Resume list -->
      <div v-if="resumeListStore.loading && resumeListStore.resumes.length === 0" class="text-center py-12">
        <svg class="animate-spin h-8 w-8 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>

      <div v-else-if="filteredResumes.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无简历</h3>
        <p class="mt-1 text-sm text-gray-500">开始创建您的第一份简历</p>
        <div class="mt-6">
          <button
            @click="createNewResume"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新建简历
          </button>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="resume in filteredResumes"
          :key="resume.id"
          class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 truncate">{{ resume.title }}</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ formatDate(resume.updatedAt) }}
                </p>
              </div>
              <div class="flex items-center">
                <button
                  @click.stop="toggleFavorite(resume)"
                  class="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <svg
                    :class="['w-5 h-5', resume.isFavorite ? 'text-yellow-500 fill-current' : '']"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <div class="relative" ref="menuRefs">
                  <button
                    @click.stop="toggleMenu(resume.id)"
                    class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <div
                    v-if="openMenuId === resume.id"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <button
                      @click="editResume(resume.id)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      编辑
                    </button>
                    <button
                      @click="duplicateResume(resume)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      复制
                    </button>
                    <button
                      @click="shareResume(resume)"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      分享
                    </button>
                    <div class="border-t border-gray-100"></div>
                    <button
                      @click="deleteResume(resume)"
                      class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Score -->
            <div v-if="resume.score" class="mt-4 flex items-center">
              <span class="text-sm text-gray-600 mr-2">评分：</span>
              <span
                :class="[
                  'text-sm font-medium',
                  resume.score >= 80 ? 'text-green-600' :
                  resume.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                ]"
              >
                {{ resume.score }}
              </span>
            </div>

            <!-- Status badge -->
            <div class="mt-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  resume.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                  resume.status === 'published' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ statusText(resume.status) }}
              </span>
            </div>
          </div>

          <div class="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <button
              @click="editResume(resume.id)"
              class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              编辑简历
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useResumeListStore } from '@/stores/resumeList'
import { useResumeStore } from '@/stores/resume'
import { AppHeader } from '@/components/layout'
import type { Resume } from '@/types'

const router = useRouter()
const resumeListStore = useResumeListStore()
const resumeStore = useResumeStore()

const searchQuery = ref('')
const statusFilter = ref('')
const openMenuId = ref<string | null>(null)

const filteredResumes = computed(() => {
  let result = resumeListStore.resumes

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(r => r.title.toLowerCase().includes(query))
  }

  if (statusFilter.value) {
    result = result.filter(r => r.status === statusFilter.value)
  }

  return result
})

onMounted(() => {
  resumeListStore.fetchResumes()
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN')
}

function statusText(status: string): string {
  const map: Record<string, string> = {
    draft: '草稿',
    published: '已发布',
    archived: '已归档',
  }
  return map[status] || status
}

function toggleMenu(id: string) {
  openMenuId.value = openMenuId.value === id ? null : id
}

async function createNewResume() {
  const resume = await resumeStore.createResume('未命名简历', 'minimal')
  if (resume) {
    router.push(`/editor/${resume.id}`)
  }
}

function editResume(id: string) {
  router.push(`/editor/${id}`)
}

async function toggleFavorite(resume: Resume) {
  await resumeListStore.toggleFavorite(resume.id)
}

async function duplicateResume(resume: Resume) {
  const newResume = await resumeStore.duplicateResume()
  if (newResume) {
    resumeListStore.addResume(newResume)
  }
  openMenuId.value = null
}

function shareResume(resume: Resume) {
  // TODO: 实现分享功能
  console.log('Share resume:', resume.id)
  openMenuId.value = null
}

async function deleteResume(resume: Resume) {
  if (confirm(`确定要删除"${resume.title}"吗？`)) {
    await resumeListStore.deleteResume(resume.id)
  }
  openMenuId.value = null
}
</script>
