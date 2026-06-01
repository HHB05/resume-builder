<template>
  <div class="bg-white min-h-full">
    <!-- Header with colored bar -->
    <div class="relative">
      <div class="h-32" :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }"></div>
      <div class="absolute bottom-0 left-0 right-0 px-8 pb-6">
        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6">
          <div class="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
               :style="{ backgroundColor: config.primaryColor }">
            {{ (content.personal.name || '姓')[0] }}
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900">{{ content.personal.name || '您的姓名' }}</h1>
            <p class="text-gray-600">{{ content.personal.title || '求职意向' }}</p>
            <div class="flex gap-4 mt-2 text-sm text-gray-500">
              <span v-if="content.personal.phone">{{ content.personal.phone }}</span>
              <span v-if="content.personal.email">{{ content.personal.email }}</span>
              <span v-if="content.personal.location">{{ content.personal.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-8 pt-24 pb-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: config.primaryColor + '15' }">
            <svg class="w-4 h-4" :style="{ color: config.primaryColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900">教育背景</h2>
        </div>
        <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0 pl-11">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ edu.school }}</span>
            <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
          </div>
          <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: config.primaryColor + '15' }">
            <svg class="w-4 h-4" :style="{ color: config.primaryColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900">工作经历</h2>
        </div>
        <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0 pl-11">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ exp.company }}</span>
            <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
          </div>
          <p class="text-gray-700 text-sm">{{ exp.position }}</p>
          <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
          <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
            <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start">
              <span class="w-1.5 h-1.5 rounded-full mt-1.5 mr-2 flex-shrink-0" :style="{ backgroundColor: config.primaryColor }"></span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: config.primaryColor + '15' }">
            <svg class="w-4 h-4" :style="{ color: config.primaryColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900">项目经历</h2>
        </div>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0 pl-11">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ proj.name }}</span>
            <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
          </div>
          <p class="text-gray-700 text-sm">{{ proj.role }}</p>
          <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: config.primaryColor + '15' }">
            <svg class="w-4 h-4" :style="{ color: config.primaryColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900">专业技能</h2>
        </div>
        <div class="pl-11 grid grid-cols-2 gap-3">
          <div v-for="skill in content.skills" :key="skill.id" class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: config.primaryColor }"></div>
            <span class="text-sm text-gray-700">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: config.primaryColor + '15' }">
            <svg class="w-4 h-4" :style="{ color: config.primaryColor }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-900">自我评价</h2>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed pl-11">{{ content.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
