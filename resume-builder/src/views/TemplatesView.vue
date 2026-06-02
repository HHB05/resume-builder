<template>
  <div class="min-h-screen bg-stone-950 text-white">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 px-6 py-4 backdrop-blur-md bg-stone-950/70 border-b border-stone-800/50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <span class="text-stone-950 font-bold text-lg">R</span>
            </div>
            <span class="font-serif text-xl tracking-tight">ResumeCraft</span>
          </router-link>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/login" class="text-sm text-stone-400 hover:text-white transition-colors">
            登录
          </router-link>
          <router-link to="/register" class="px-5 py-2 bg-white text-stone-950 text-sm font-medium rounded-full hover:bg-stone-200 transition-all">
            免费注册
          </router-link>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-12 px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-serif tracking-tight">模板中心</h1>
        <p class="text-stone-500 mt-2">选择适合您的专业模板，开始制作简历</p>
      </div>

      <!-- Filters -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-3">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
            'px-4 py-2 text-sm rounded-full transition-all',
            selectedFilter === filter.value
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-stone-800/50 text-stone-400 hover:text-white border border-transparent'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Templates grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          @click="selectTemplate(template)"
          class="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all hover:scale-[1.02]"
        >
          <!-- Template image -->
          <img
            v-if="template.thumbnailUrl"
            :src="template.thumbnailUrl"
            :alt="template.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-stone-800 p-3 flex flex-col">
            <div class="w-full h-1/4 rounded mb-2" :style="{ backgroundColor: template.config.primaryColor }"></div>
            <div class="space-y-1">
              <div class="w-3/4 h-1 bg-stone-600 rounded"></div>
              <div class="w-1/2 h-1 bg-stone-600 rounded"></div>
            </div>
          </div>

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h4 class="font-serif text-white text-sm mb-1">{{ template.name }}</h4>
            <div class="flex items-center gap-2">
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded',
                  template.isPremium
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                ]"
              >
                {{ template.isPremium ? 'PRO' : '免费' }}
              </span>
              <span class="text-xs text-stone-400">{{ template.style }}</span>
            </div>
          </div>

          <!-- Premium badge -->
          <div v-if="template.isPremium" class="absolute top-2 right-2">
            <span class="px-2 py-0.5 bg-amber-500 text-stone-950 text-xs font-bold rounded">PRO</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'
import { templates } from '@/data/templates'
import type { Template } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const selectedFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '中文简历', value: 'chinese' },
  { label: '英文简历', value: 'english' },
  { label: '简约', value: 'minimal' },
  { label: '商务', value: 'business' },
  { label: '创意', value: 'creative' },
]

const filteredTemplates = computed(() => {
  if (selectedFilter.value === 'all') {
    return templates
  }
  if (selectedFilter.value === 'chinese') {
    return templates.filter(t => t.id.startsWith('cn-'))
  }
  if (selectedFilter.value === 'english') {
    return templates.filter(t => t.id.startsWith('en-'))
  }
  return templates.filter(t => t.style === selectedFilter.value)
})

async function selectTemplate(template: Template) {
  if (template.isPremium && !authStore.isProUser) {
    // 专业版模板，需要升级
    alert('此模板为专业版，请升级后使用')
    return
  }

  if (authStore.isAuthenticated) {
    // 已登录，直接跳转到编辑器
    const resume = await resumeStore.createResume('新简历', template.id)
    if (resume) {
      router.push(`/editor/${resume.id}`)
    }
  } else {
    // 未登录，跳转到登录页面
    router.push({ path: '/login', query: { template: template.id } })
  }
}
</script>
