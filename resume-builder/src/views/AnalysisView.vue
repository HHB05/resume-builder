<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">简历分析报告</h1>
        <p class="mt-1 text-sm text-gray-600">查看您的简历评分和改进建议</p>
      </div>

      <!-- Loading -->
      <div v-if="aiStore.isAnalyzing" class="text-center py-12">
        <svg class="animate-spin h-12 w-12 text-primary-600 mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-4 text-lg text-gray-600">正在分析您的简历...</p>
      </div>

      <!-- Results -->
      <div v-else-if="aiStore.scoreResult">
        <!-- Overall Score -->
        <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div class="flex items-center justify-center">
            <AiScoreRing :score="aiStore.scoreResult.overallScore" :size="160" />
          </div>
          <h2 class="text-center text-xl font-semibold text-gray-900 mt-6">综合评分</h2>
          <p class="text-center text-gray-600 mt-2">
            {{ getScoreComment(aiStore.scoreResult.overallScore) }}
          </p>
        </div>

        <!-- Dimensions -->
        <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">维度分析</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div
              v-for="(value, key) in aiStore.scoreResult.dimensions"
              :key="key"
              class="text-center"
            >
              <div class="relative inline-flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    :stroke="getDimensionColor(value)"
                    stroke-width="6"
                    stroke-linecap="round"
                    :stroke-dasharray="251.2"
                    :stroke-dashoffset="251.2 * (1 - value / 100)"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span class="absolute text-lg font-semibold">{{ value }}</span>
              </div>
              <p class="mt-2 text-sm text-gray-600">{{ getDimensionName(key) }}</p>
            </div>
          </div>
        </div>

        <!-- Issues -->
        <div class="bg-white rounded-xl shadow-sm p-8 mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">问题清单</h3>
          <div class="space-y-4">
            <div
              v-for="issue in aiStore.scoreResult.issues"
              :key="issue.id"
              :class="[
                'p-4 rounded-lg border',
                issue.severity === 'error' ? 'bg-red-50 border-red-200' :
                issue.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              ]"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg
                    v-if="issue.severity === 'error'"
                    class="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <svg
                    v-else-if="issue.severity === 'warning'"
                    class="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">{{ issue.message }}</h4>
                  <p class="text-sm text-gray-600 mt-1">{{ issue.suggestion }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-center gap-4">
          <button
            @click="goToEditor"
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            去优化简历
          </button>
          <button
            @click="analyzeAgain"
            class="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            重新分析
          </button>
        </div>
      </div>

      <!-- No data -->
      <div v-else class="text-center py-12 bg-white rounded-xl shadow-sm">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">暂无分析数据</h3>
        <p class="mt-1 text-sm text-gray-500">请先编辑简历，然后进行分析</p>
        <div class="mt-6">
          <button
            @click="analyzeAgain"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            开始分析
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAiStore } from '@/stores/ai'
import { useResumeStore } from '@/stores/resume'
import { AppHeader } from '@/components/layout'
import { AiScoreRing } from '@/components/ai'

const route = useRoute()
const router = useRouter()
const aiStore = useAiStore()
const resumeStore = useResumeStore()

const resumeId = route.params.resumeId as string

onMounted(async () => {
  if (resumeId) {
    await resumeStore.loadResume(resumeId)
    await analyzeResume()
  }
})

async function analyzeResume() {
  if (resumeStore.resumeId) {
    await aiStore.scoreResume(resumeStore.resumeId)
  }
}

function getScoreComment(score: number): string {
  if (score >= 80) return '您的简历质量很高，继续保持！'
  if (score >= 60) return '您的简历还有提升空间，建议参考改进建议'
  return '建议您根据下方的改进建议优化简历'
}

function getDimensionColor(value: number): string {
  if (value >= 80) return '#10b981'
  if (value >= 60) return '#f59e0b'
  return '#ef4444'
}

function getDimensionName(key: string): string {
  const names: Record<string, string> = {
    completeness: '完整性',
    professionalism: '专业性',
    quantification: '量化程度',
    layout: '排版',
    keywords: '关键词',
  }
  return names[key] || key
}

function goToEditor() {
  router.push(`/editor/${resumeId}`)
}

function analyzeAgain() {
  analyzeResume()
}
</script>
