<template>
  <div class="bg-white min-h-full" :style="{ fontFamily: config.fontFamily?.body || 'Inter, sans-serif' }">
    <!-- Header -->
    <div class="p-8 pb-6" :style="{ borderBottom: `3px solid ${config.primaryColor}` }">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold" :style="{ color: config.primaryColor }">
            {{ content.personal.name || '您的姓名' }}
          </h1>
          <p class="text-lg text-gray-600 mt-1">{{ content.personal.title || '求职意向' }}</p>
        </div>
        <div class="text-right text-sm text-gray-600 space-y-1">
          <p v-if="content.personal.phone">{{ content.personal.phone }}</p>
          <p v-if="content.personal.email">{{ content.personal.email }}</p>
          <p v-if="content.personal.location">{{ content.personal.location }}</p>
        </div>
      </div>
    </div>

    <!-- Education -->
    <div v-if="content.education?.length" class="p-8 pb-4">
      <h2 class="text-lg font-bold mb-4 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}20` }">
        教育背景
      </h2>
      <div v-for="edu in content.education" :key="edu.id" class="mb-4 last:mb-0">
        <div class="flex justify-between items-baseline">
          <div>
            <span class="font-semibold text-gray-900">{{ edu.school }}</span>
            <span class="text-gray-600 ml-2">{{ edu.major }} · {{ edu.degree }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
        </div>
        <p v-if="edu.gpa" class="text-sm text-gray-600 mt-1">GPA: {{ edu.gpa }}</p>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="content.experience?.length" class="p-8 pb-4">
      <h2 class="text-lg font-bold mb-4 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}20` }">
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
            <span class="text-gray-400 mr-2">•</span>
            <span>{{ h }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="content.projects?.length" class="p-8 pb-4">
      <h2 class="text-lg font-bold mb-4 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}20` }">
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

    <!-- Skills -->
    <div v-if="content.skills?.length" class="p-8 pb-4">
      <h2 class="text-lg font-bold mb-4 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}20` }">
        专业技能
      </h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in content.skills" :key="skill.id"
              class="px-3 py-1 rounded-full text-sm"
              :style="{ backgroundColor: config.primaryColor + '15', color: config.primaryColor }">
          {{ skill.name }}
        </span>
      </div>
    </div>

    <!-- Summary -->
    <div v-if="content.summary" class="p-8">
      <h2 class="text-lg font-bold mb-4 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}20` }">
        自我评价
      </h2>
      <p class="text-gray-600 text-sm leading-relaxed">{{ content.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
