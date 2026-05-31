<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">个人信息</h2>
      <p class="text-sm text-gray-500 mb-6">填写您的基本联系信息</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 姓名 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          姓名 <span class="text-red-500">*</span>
        </label>
        <input
          v-model="personalInfo.name"
          @input="updateField('name', personalInfo.name)"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="请输入您的姓名"
        />
      </div>

      <!-- 求职意向 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          求职意向 <span class="text-red-500">*</span>
        </label>
        <input
          v-model="personalInfo.title"
          @input="updateField('title', personalInfo.title)"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="如：前端工程师"
        />
      </div>

      <!-- 手机号 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          手机号 <span class="text-red-500">*</span>
        </label>
        <input
          v-model="personalInfo.phone"
          @input="updateField('phone', personalInfo.phone)"
          type="tel"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="请输入手机号"
        />
      </div>

      <!-- 邮箱 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          邮箱 <span class="text-red-500">*</span>
        </label>
        <input
          v-model="personalInfo.email"
          @input="updateField('email', personalInfo.email)"
          type="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="请输入邮箱地址"
        />
      </div>

      <!-- 所在地 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          所在地
        </label>
        <input
          v-model="personalInfo.location"
          @input="updateField('location', personalInfo.location)"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="如：北京市"
        />
      </div>
    </div>

    <!-- 在线链接 -->
    <div class="mt-6">
      <h3 class="text-sm font-medium text-gray-700 mb-3">在线链接（可选）</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 个人网站 -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">个人网站</label>
          <input
            v-model="personalInfo.website"
            @input="updateField('website', personalInfo.website)"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
            placeholder="https://..."
          />
        </div>

        <!-- GitHub -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">GitHub</label>
          <input
            v-model="personalInfo.github"
            @input="updateField('github', personalInfo.github)"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
            placeholder="https://github.com/..."
          />
        </div>

        <!-- LinkedIn -->
        <div>
          <label class="block text-xs text-gray-500 mb-1">LinkedIn</label>
          <input
            v-model="personalInfo.linkedin"
            @input="updateField('linkedin', personalInfo.linkedin)"
            type="url"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors text-sm"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>
    </div>

    <!-- AI 助手提示 -->
    <div class="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div class="ml-3">
          <h4 class="text-sm font-medium text-purple-900">AI 助手提示</h4>
          <p class="text-sm text-purple-700 mt-1">
            填写完整的信息可以帮助HR更好地联系您。确保手机号和邮箱准确无误。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { PersonalInfo } from '@/types'

const resumeStore = useResumeStore()

// 本地表单状态
const personalInfo = reactive<PersonalInfo>({
  name: '',
  phone: '',
  email: '',
  location: '',
  title: '',
  website: '',
  github: '',
  linkedin: '',
})

// 初始化表单数据
watch(
  () => resumeStore.resumeContent.personal,
  (newPersonal) => {
    if (newPersonal) {
      Object.assign(personalInfo, newPersonal)
    }
  },
  { immediate: true, deep: true }
)

// 更新字段
function updateField(field: keyof PersonalInfo, value: string | undefined) {
  resumeStore.updatePersonalInfo({ [field]: value || '' })
}
</script>
