<template>
  <div class="bg-white min-h-full">
    <!-- Gradient Header -->
    <div class="p-8 text-white" :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
      <h1 class="text-3xl font-bold">
        {{ content.personal?.name || '您的姓名' }}
      </h1>
      <p class="text-lg text-white/80 mt-1">{{ content.personal?.title || '求职意向' }}</p>
      <div class="flex flex-wrap gap-4 mt-3 text-sm text-white/70">
        <span v-if="content.personal?.phone">📱 {{ content.personal.phone }}</span>
        <span v-if="content.personal?.email">✉️ {{ content.personal.email }}</span>
        <span v-if="content.personal?.location">📍 {{ content.personal.location }}</span>
      </div>
    </div>

    <div class="p-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30` }">
          教育背景
        </h2>
        <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold">{{ edu.school }}</span>
            <span class="text-sm text-gray-500">{{ edu.period?.start }} - {{ edu.period?.end }}</span>
          </div>
          <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30` }">
          工作经历
        </h2>
        <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold">{{ exp.company }}</span>
            <span class="text-sm text-gray-500">{{ exp.period?.start }} - {{ exp.period?.end }}</span>
          </div>
          <p class="text-sm" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
          <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
          <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
            <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600">• {{ h }}</li>
          </ul>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30` }">
          项目经历
        </h2>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-semibold">{{ proj.name }}</span>
            <span class="text-sm text-gray-500">{{ proj.period?.start }} - {{ proj.period?.end }}</span>
          </div>
          <p class="text-sm" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
          <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mb-6">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30` }">
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
      <div v-if="content.summary">
        <h2 class="text-lg font-bold mb-3 pb-2" :style="{ color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}30` }">
          自我评价
        </h2>
        <p class="text-sm text-gray-600 leading-relaxed">{{ content.summary }}</p>
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
