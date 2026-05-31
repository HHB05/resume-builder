<template>
  <div class="bg-white shadow-lg" :style="pageStyle">
    <!-- Header -->
    <div class="p-5 border-b-2" :style="headerStyle">
      <h1 class="text-2xl font-bold text-gray-900">{{ content.personal.name || '您的姓名' }}</h1>
      <p class="text-sm text-gray-600 mt-1">{{ content.personal.title || '求职意向' }}</p>
      <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
        <span v-if="content.personal.phone" class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {{ content.personal.phone }}
        </span>
        <span v-if="content.personal.email" class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ content.personal.email }}
        </span>
        <span v-if="content.personal.location" class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ content.personal.location }}
        </span>
      </div>
    </div>

    <!-- Education -->
    <div v-if="content.education.length > 0" class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">教育经历</h2>
      <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">{{ edu.school }}</h3>
            <p class="text-sm text-gray-600">{{ edu.major }} · {{ edu.degree }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
        </div>
        <p v-if="edu.gpa" class="text-sm text-gray-600 mt-1">GPA: {{ edu.gpa }}</p>
        <p v-if="edu.description" class="text-sm text-gray-600 mt-1">{{ edu.description }}</p>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="content.experience.length > 0" class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">工作经验</h2>
      <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">{{ exp.company }}</h3>
            <p class="text-sm text-gray-600">{{ exp.position }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
        </div>
        <p v-if="exp.description" class="text-sm text-gray-600 mt-2 whitespace-pre-line">{{ exp.description }}</p>
        <ul v-if="exp.highlights.length > 0" class="mt-2 space-y-1">
          <li v-for="(highlight, index) in exp.highlights" :key="index" class="text-sm text-gray-600 flex items-start">
            <span class="text-gray-400 mr-2">•</span>
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="content.projects.length > 0" class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">项目经历</h2>
      <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-medium text-gray-900">{{ proj.name }}</h3>
            <p class="text-sm text-gray-600">{{ proj.role }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
        </div>
        <p v-if="proj.description" class="text-sm text-gray-600 mt-2 whitespace-pre-line">{{ proj.description }}</p>
        <div v-if="proj.techStack.length > 0" class="flex flex-wrap gap-1 mt-2">
          <span v-for="tech in proj.techStack" :key="tech" class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
            {{ tech }}
          </span>
        </div>
        <ul v-if="proj.highlights.length > 0" class="mt-2 space-y-1">
          <li v-for="(highlight, index) in proj.highlights" :key="index" class="text-sm text-gray-600 flex items-start">
            <span class="text-gray-400 mr-2">•</span>
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="content.skills.length > 0" class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">技能特长</h2>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="skill in content.skills" :key="skill.id" class="flex items-center">
          <span class="text-sm text-gray-700 mr-2">{{ skill.name }}</span>
          <div class="flex">
            <span
              v-for="i in 5"
              :key="i"
              :class="[
                'w-2 h-2 rounded-full mr-1',
                skill.level >= i ? 'bg-primary-500' : 'bg-gray-200'
              ]"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="content.summary" class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 mb-3 pb-1 border-b border-gray-200">自我评价</h2>
      <p class="text-sm text-gray-600 whitespace-pre-line">{{ content.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeContent } from '@/types'

const props = defineProps<{
  content: ResumeContent
  templateId: string
  previewMode: 'pc' | 'tablet' | 'mobile'
}>()

const pageStyle = computed(() => {
  const widths = {
    pc: '210mm',
    tablet: '190mm',
    mobile: '170mm',
  }
  return {
    width: widths[props.previewMode],
    minHeight: '297mm',
    padding: '20mm',
  }
})

const headerStyle = computed(() => {
  const primaryColor = '#2563eb'
  return {
    borderColor: primaryColor,
  }
})
</script>
