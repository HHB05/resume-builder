<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">教育经历</h2>
        <p class="text-sm text-gray-500 mt-1">从最高学历开始填写</p>
      </div>
      <button
        @click="addEducation"
        class="flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加教育经历
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="educations.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无教育经历</h3>
      <p class="mt-1 text-sm text-gray-500">点击上方按钮添加您的教育背景</p>
    </div>

    <!-- Education entries -->
    <div
      v-for="(edu, index) in educations"
      :key="edu.id"
      class="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-900">教育经历 {{ index + 1 }}</h3>
        <button
          @click="removeEducation(edu.id)"
          class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
          title="删除"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 学校 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            学校名称 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="edu.school"
            @input="updateEducation(edu.id, { school: edu.school })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：北京大学"
          />
        </div>

        <!-- 专业 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            专业 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="edu.major"
            @input="updateEducation(edu.id, { major: edu.major })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：计算机科学与技术"
          />
        </div>

        <!-- 学历 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            学历 <span class="text-red-500">*</span>
          </label>
          <select
            v-model="edu.degree"
            @change="updateEducation(edu.id, { degree: edu.degree })"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">请选择</option>
            <option value="高中">高中</option>
            <option value="大专">大专</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
            <option value="博士">博士</option>
            <option value="MBA">MBA</option>
          </select>
        </div>

        <!-- GPA -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            GPA / 成绩
          </label>
          <input
            v-model="edu.gpa"
            @input="updateEducation(edu.id, { gpa: edu.gpa })"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="如：3.8/4.0"
          />
        </div>

        <!-- 开始时间 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            开始时间 <span class="text-red-500">*</span>
          </label>
          <input
            v-model="edu.period.start"
            @input="updateEducation(edu.id, { period: edu.period })"
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
            v-model="edu.period.end"
            @input="updateEducation(edu.id, { period: edu.period })"
            type="month"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <!-- 描述 -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          描述（可选）
        </label>
        <textarea
          v-model="edu.description"
          @input="updateEducation(edu.id, { description: edu.description })"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="如：主修课程、获奖经历、校园活动等"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { EducationEntry } from '@/types'

const resumeStore = useResumeStore()

const educations = computed(() => resumeStore.resumeContent.education)

// 添加教育经历
function addEducation() {
  resumeStore.addEducation({
    school: '',
    degree: '',
    major: '',
    period: { start: '', end: '' },
    gpa: '',
    description: '',
  })
}

// 更新教育经历
function updateEducation(id: string, data: Partial<EducationEntry>) {
  resumeStore.updateEducation(id, data)
}

// 删除教育经历
function removeEducation(id: string) {
  if (confirm('确定要删除这条教育经历吗？')) {
    resumeStore.removeEducation(id)
  }
}
</script>
