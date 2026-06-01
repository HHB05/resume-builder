<template>
  <div class="min-h-screen bg-stone-950 text-white">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 px-6 py-4 backdrop-blur-md bg-stone-950/70 border-b border-stone-800/50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-lg">R</span>
          </div>
          <span class="font-serif text-xl tracking-tight">ResumeCraft</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="text-sm text-stone-400">{{ authStore.userNickname }}</span>
          <button @click="handleLogout" class="text-sm text-stone-500 hover:text-white transition-colors">
            退出
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-12 px-6">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl font-serif tracking-tight">我的简历</h1>
        <p class="text-stone-500 mt-2">管理您的所有简历</p>
      </div>

      <!-- Actions -->
      <div class="mb-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索简历..."
              class="w-64 px-4 py-2.5 bg-stone-800/50 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>

        <button
          @click="createNewResume"
          class="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          新建简历
        </button>
      </div>

      <!-- Resume list -->
      <div v-if="resumeListStore.loading && resumeListStore.resumes.length === 0" class="text-center py-20">
        <div class="w-12 h-12 border-4 border-stone-700 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
        <p class="mt-4 text-stone-500">加载中...</p>
      </div>

      <div v-else-if="filteredResumes.length === 0" class="text-center py-20 bg-stone-900/30 rounded-2xl border border-stone-800">
        <div class="text-6xl mb-4">📄</div>
        <h3 class="text-xl font-serif text-stone-300">暂无简历</h3>
        <p class="text-stone-500 mt-2">创建您的第一份简历</p>
        <button
          @click="createNewResume"
          class="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
        >
          新建简历
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="resume in filteredResumes"
          :key="resume.id"
          class="group relative bg-stone-900/50 rounded-2xl border border-stone-800 hover:border-amber-500/50 transition-all overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-serif text-white truncate">{{ resume.title }}</h3>
                <p class="text-sm text-stone-500 mt-1">
                  {{ formatDate(resume.updatedAt) }}
                </p>
              </div>
              <button
                @click.stop="toggleFavorite(resume)"
                class="p-2 text-stone-500 hover:text-amber-400 transition-colors"
              >
                <svg v-if="resume.isFavorite" class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </button>
            </div>

            <div class="flex items-center gap-2 mb-4">
              <span class="px-2 py-1 bg-stone-800 rounded text-xs text-stone-400">
                {{ templateName(resume.templateId) }}
              </span>
              <span
                :class="[
                  'px-2 py-1 rounded text-xs',
                  resume.status === 'draft' ? 'bg-stone-800 text-stone-400' :
                  'bg-emerald-500/20 text-emerald-400'
                ]"
              >
                {{ resume.status === 'draft' ? '草稿' : '已发布' }}
              </span>
            </div>

            <div class="flex gap-2">
              <button
                @click="editResume(resume.id)"
                class="flex-1 py-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl text-sm font-medium transition-colors"
              >
                编辑
              </button>
              <button
                @click="deleteResume(resume)"
                class="p-2.5 bg-stone-800 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeListStore } from '@/stores/resumeList'
import { useResumeStore } from '@/stores/resume'
import type { Resume } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const resumeListStore = useResumeListStore()
const resumeStore = useResumeStore()

const searchQuery = ref('')

const filteredResumes = computed(() => {
  if (!searchQuery.value) return resumeListStore.resumes
  const query = searchQuery.value.toLowerCase()
  return resumeListStore.resumes.filter(r => r.title.toLowerCase().includes(query))
})

const templateNames: Record<string, string> = {
  minimal: '简约经典',
  modern: '现代双栏',
  professional: '商务专业',
  creative: '创意设计',
  business: '经典商务',
  simple: '极简风格',
  twoColumn: '清新双栏',
}

function templateName(id: string): string {
  return templateNames[id] || id
}

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

async function deleteResume(resume: Resume) {
  if (confirm(`确定要删除"${resume.title}"吗？`)) {
    await resumeListStore.deleteResume(resume.id)
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}
</script>
