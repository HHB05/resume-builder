<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto py-12 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12">
        <svg class="animate-spin h-8 w-8 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>

      <div v-else-if="resume" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-8">在线简历</h1>
          <PreviewRenderer
            :content="resume.content"
            :template-id="resume.templateId"
            preview-mode="pc"
          />
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">简历不存在或已过期</h3>
        <p class="mt-1 text-sm text-gray-500">该分享链接无效或已失效</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppHeader } from '@/components/layout'
import { PreviewRenderer } from '@/components/preview'
import { shareService } from '@/services/share.service'
import type { Resume } from '@/types'

const route = useRoute()
const token = route.params.token as string

const loading = ref(true)
const resume = ref<Resume | null>(null)

onMounted(async () => {
  try {
    const data = await shareService.getShareInfo(token)
    resume.value = data.resume
  } catch (error) {
    console.error('Failed to load shared resume:', error)
  } finally {
    loading.value = false
  }
})
</script>
