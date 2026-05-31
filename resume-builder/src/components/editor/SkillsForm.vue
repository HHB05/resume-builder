<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">技能特长</h2>
        <p class="text-sm text-gray-500 mt-1">展示您的专业技能</p>
      </div>
      <button
        @click="addSkill"
        class="flex items-center px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        添加技能
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="skills.length === 0"
      class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">暂无技能</h3>
      <p class="mt-1 text-sm text-gray-500">点击上方按钮添加您的专业技能</p>
    </div>

    <!-- Skills grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
      >
        <div class="flex items-center justify-between mb-3">
          <input
            v-model="skill.name"
            @input="updateSkill(skill.id, { name: skill.name })"
            type="text"
            class="text-sm font-medium text-gray-900 border-none focus:ring-0 focus:outline-none bg-transparent p-0"
            placeholder="技能名称"
          />
          <button
            @click="removeSkill(skill.id)"
            class="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
            title="删除"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Skill level -->
        <div class="flex items-center space-x-1">
          <button
            v-for="level in 5"
            :key="level"
            @click="updateSkill(skill.id, { level: level as any })"
            :class="[
              'w-8 h-2 rounded-full transition-colors',
              skill.level >= level ? 'bg-primary-500' : 'bg-gray-200'
            ]"
          ></button>
        </div>
        <div class="flex justify-between mt-1">
          <span class="text-xs text-gray-500">了解</span>
          <span class="text-xs text-gray-500">精通</span>
        </div>
      </div>
    </div>

    <!-- AI Skills Suggestion -->
    <div class="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div class="ml-3">
          <h4 class="text-sm font-medium text-purple-900">AI 技能推荐</h4>
          <p class="text-sm text-purple-700 mt-1">
            根据您的求职意向，AI可以为您推荐相关技能。点击右上角"AI助手"开启智能推荐。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResumeStore } from '@/stores/resume'
import type { SkillEntry } from '@/types'

const resumeStore = useResumeStore()

const skills = computed(() => resumeStore.resumeContent.skills)

// 添加技能
function addSkill() {
  resumeStore.addSkill({
    name: '',
    level: 3,
  })
}

// 更新技能
function updateSkill(id: string, data: Partial<SkillEntry>) {
  resumeStore.updateSkill(id, data)
}

// 删除技能
function removeSkill(id: string) {
  resumeStore.removeSkill(id)
}
</script>
