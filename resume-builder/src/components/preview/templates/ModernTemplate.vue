<template>
  <div class="bg-white min-h-full flex">
    <!-- Left Sidebar -->
    <div class="w-1/3 p-6" :style="{ backgroundColor: config.primaryColor }">
      <!-- Avatar placeholder -->
      <div class="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
        <span class="text-3xl font-bold text-white">{{ (content.personal.name || '姓')[0] }}</span>
      </div>

      <!-- Name -->
      <h1 class="text-2xl font-bold text-white text-center">{{ content.personal.name || '您的姓名' }}</h1>
      <p class="text-white/80 text-center mt-1">{{ content.personal.title || '求职意向' }}</p>

      <!-- Contact -->
      <div class="mt-8 space-y-3">
        <h3 class="text-white/60 text-xs uppercase tracking-wider">联系方式</h3>
        <div class="space-y-2 text-sm text-white">
          <p v-if="content.personal.phone" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {{ content.personal.phone }}
          </p>
          <p v-if="content.personal.email" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            {{ content.personal.email }}
          </p>
          <p v-if="content.personal.location" class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            {{ content.personal.location }}
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mt-8">
        <h3 class="text-white/60 text-xs uppercase tracking-wider mb-4">专业技能</h3>
        <div class="space-y-3">
          <div v-for="skill in content.skills" :key="skill.id">
            <div class="flex justify-between text-sm text-white mb-1">
              <span>{{ skill.name }}</span>
              <span class="text-white/60">{{ skill.level * 20 }}%</span>
            </div>
            <div class="h-1.5 bg-white/20 rounded-full">
              <div class="h-full bg-white rounded-full" :style="{ width: skill.level * 20 + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <div class="w-2/3 p-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          教育背景
        </h2>
        <div v-for="edu in content.education" :key="edu.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ edu.school }}</span>
            <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
          </div>
          <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
          <p v-if="edu.gpa" class="text-gray-500 text-sm mt-1">GPA: {{ edu.gpa }}</p>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          工作经历
        </h2>
        <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ exp.company }}</span>
            <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
          </div>
          <p class="text-gray-700">{{ exp.position }}</p>
          <p v-if="exp.description" class="text-sm text-gray-600 mt-2">{{ exp.description }}</p>
          <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
            <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start">
              <span class="mr-2" :style="{ color: config.primaryColor }">▸</span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          项目经历
        </h2>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold text-gray-900">{{ proj.name }}</span>
            <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
          </div>
          <p class="text-gray-700">{{ proj.role }}</p>
          <p v-if="proj.description" class="text-sm text-gray-600 mt-2">{{ proj.description }}</p>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <h2 class="text-lg font-bold mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          自我评价
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed">{{ content.summary }}</p>
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
