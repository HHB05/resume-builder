<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">项目经历</h2>
        <p class="text-sm text-gray-500 mt-1">展示您参与的重要项目</p>
      </div>
      <button
        @click="addProject"
        class="flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加项目经历
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="projects.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无项目经历</h3>
      <p class="mt-1 text-sm text-gray-500">点击上方按钮添加您的项目经验</p>
    </div>

    <!-- Project entries -->
    <div
      v-for="(proj, index) in projects"
      :key="proj.id"
      class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-900">项目经历 {{ index + 1 }}</h3>
        <button
          @click="removeProject(proj.id)"
          class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
          title="删除"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 项目名称 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            项目名称 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="proj.name"
            @input="updateProject(proj.id, { name: proj.name })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：电商平台前端重构"
          />
        </div>

        <!-- 担任角色 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            担任角色 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="proj.role"
            @input="updateProject(proj.id, { role: proj.role })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：前端负责人"
          />
        </div>

        <!-- 开始时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            开始时间 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="proj.period.start"
            @input="updateProject(proj.id, { period: proj.period })"
            type="month"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        <!-- 结束时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            结束时间 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="proj.period.end"
            @input="updateProject(proj.id, { period: proj.period })"
            type="month"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          技术栈
        </label>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(tech, tIndex) in proj.techStack"
            :key="tIndex"
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          >
            {{ tech }}
            <button
              @click="removeTech(proj.id, tIndex)"
              class="ml-1 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          <input
            v-model="newTech"
            @keydown.enter="addTech(proj.id)"
            type="text"
            class="px-3 py-1 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-32"
            placeholder="输入技术后回车"
          />
        </div>
      </div>

      <!-- 项目描述 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          项目描述 <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="proj.description"
          @input="updateProject(proj.id, { description: proj.description })"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="描述项目背景、您的职责和取得的成果"
        ></textarea>
      </div>

      <!-- 项目亮点 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          项目亮点
        </label>
        <div class="space-y-2">
          <div
            v-for="(highlight, hIndex) in proj.highlights"
            :key="hIndex"
            class="flex items-center gap-2"
          >
            <input
              v-model="proj.highlights[hIndex]"
              @input="updateProject(proj.id, { highlights: proj.highlights })"
              type="text"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
              placeholder="如：优化了首屏加载时间，从3秒降至1秒"
            />
            <button
              @click="removeHighlight(proj.id, hIndex)"
              class="p-2 text-gray-400 hover:text-red-500 rounded transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button
            @click="addHighlight(proj.id)"
            class="flex items-center text-sm text-primary-600 hover:text-primary-700"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            添加亮点
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { ProjectEntry } from '@/types'

const resumeStore = useResumeStore()

const projects = computed(() => resumeStore.resumeContent.projects)
const newTech = ref('')

// 添加项目经历
function addProject() {
  resumeStore.addProject({
    name: '',
    role: '',
    period: { start: '', end: '' },
    description: '',
    techStack: [],
    highlights: [],
  })
}

// 更新项目经历
function updateProject(id: string, data: Partial<ProjectEntry>) {
  resumeStore.updateProject(id, data)
}

// 删除项目经历
function removeProject(id: string) {
  if (confirm('确定要删除这条项目经历吗？')) {
    resumeStore.removeProject(id)
  }
}

// 添加技术栈
function addTech(projId: string) {
  if (newTech.value.trim()) {
    const proj = projects.value.find(p => p.id === projId)
    if (proj) {
      updateProject(projId, { techStack: [...proj.techStack, newTech.value.trim()] })
      newTech.value = ''
    }
  }
}

// 删除技术栈
function removeTech(projId: string, index: number) {
  const proj = projects.value.find(p => p.id === projId)
  if (proj) {
    const newTechStack = [...proj.techStack]
    newTechStack.splice(index, 1)
    updateProject(projId, { techStack: newTechStack })
  }
}

// 添加项目亮点
function addHighlight(projId: string) {
  const proj = projects.value.find(p => p.id === projId)
  if (proj) {
    updateProject(projId, { highlights: [...proj.highlights, ''] })
  }
}

// 删除项目亮点
function removeHighlight(projId: string, index: number) {
  const proj = projects.value.find(p => p.id === projId)
  if (proj) {
    const newHighlights = [...proj.highlights]
    newHighlights.splice(index, 1)
    updateProject(projId, { highlights: newHighlights })
  }
}
</script>
