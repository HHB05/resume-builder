<template>
  <div class="bg-white min-h-full p-8">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ content.personal.name || '您的姓名' }}</h1>
      <p class="text-gray-600 mt-1">{{ content.personal.title || '求职意向' }}</p>
      <div class="flex gap-4 mt-2 text-sm text-gray-500">
        <span v-if="content.personal.phone">{{ content.personal.phone }}</span>
        <span v-if="content.personal.email">| {{ content.personal.email }}</span>
        <span v-if="content.personal.location">| {{ content.personal.location }}</span>
      </div>
    </div>

    <!-- Education -->
    <div v-if="content.education?.length" class="mb-6">
      <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" :style="{ color: config.primaryColor }">
        教育背景
      </h2>
      <div v-for="edu in content.education" :key="edu.id" class="mb-2 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold text-gray-900">{{ edu.school }}</span>
          <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
        </div>
        <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
      </div>
    </div>

    <!-- Experience -->
    <div v-if="content.experience?.length" class="mb-6">
      <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" :style="{ color: config.primaryColor }">
        工作经历
      </h2>
      <div v-for="exp in content.experience" :key="exp.id" class="mb-3 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold text-gray-900">{{ exp.company }}</span>
          <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
        </div>
        <p class="text-gray-700 text-sm">{{ exp.position }}</p>
        <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
        <ul v-if="exp.highlights?.length" class="mt-1 space-y-0.5">
          <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600">
            · {{ h }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <div v-if="content.projects?.length" class="mb-6">
      <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" :style="{ color: config.primaryColor }">
        项目经历
      </h2>
      <div v-for="proj in content.projects" :key="proj.id" class="mb-3 last:mb-0">
        <div class="flex justify-between items-baseline">
          <span class="font-semibold text-gray-900">{{ proj.name }}</span>
          <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
        </div>
        <p class="text-gray-700 text-sm">{{ proj.role }}</p>
        <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="content.skills?.length" class="mb-6">
      <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" :style="{ color: config.primaryColor }">
        专业技能
      </h2>
      <p class="text-sm text-gray-600">
        {{ content.skills.map((s: any) => s.name).join('、') }}
      </p>
    </div>

    <!-- Summary -->
    <div v-if="content.summary">
      <h2 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider" :style="{ color: config.primaryColor }">
        自我评价
      </h2>
      <p class="text-sm text-gray-600 leading-relaxed">{{ content.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
