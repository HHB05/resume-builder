<template>
  <div class="bg-white min-h-full">
    <!-- Header -->
    <div class="p-8 text-center border-b-4" :style="{ borderColor: config.primaryColor }">
      <h1 class="text-3xl font-bold text-gray-900 tracking-wide">{{ content.personal.name || '您的姓名' }}</h1>
      <p class="text-gray-600 mt-2">{{ content.personal.title || '求职意向' }}</p>
      <div class="flex justify-center gap-6 mt-4 text-sm text-gray-500">
        <span v-if="content.personal.phone">{{ content.personal.phone }}</span>
        <span v-if="content.personal.email">{{ content.personal.email }}</span>
        <span v-if="content.personal.location">{{ content.personal.location }}</span>
      </div>
    </div>

    <div class="p-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-8">
        <h2 class="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          教育背景
        </h2>
        <div v-for="edu in content.education" :key="edu.id" class="mb-3 last:mb-0">
          <div class="flex justify-between items-baseline">
            <div>
              <span class="font-bold text-gray-900">{{ edu.school }}</span>
              <span class="text-gray-600 ml-2">|</span>
              <span class="text-gray-600 ml-2">{{ edu.major }} · {{ edu.degree }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-8">
        <h2 class="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          工作经历
        </h2>
        <div v-for="exp in content.experience" :key="exp.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-bold text-gray-900">{{ exp.company }}</span>
            <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
          </div>
          <p class="text-gray-700 italic">{{ exp.position }}</p>
          <p v-if="exp.description" class="text-sm text-gray-600 mt-1">{{ exp.description }}</p>
          <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
            <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start">
              <span class="text-gray-400 mr-2">▪</span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-8">
        <h2 class="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          项目经历
        </h2>
        <div v-for="proj in content.projects" :key="proj.id" class="mb-4 last:mb-0">
          <div class="flex justify-between items-baseline">
            <span class="font-bold text-gray-900">{{ proj.name }}</span>
            <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
          </div>
          <p class="text-gray-700 italic">{{ proj.role }}</p>
          <p v-if="proj.description" class="text-sm text-gray-600 mt-1">{{ proj.description }}</p>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mb-8">
        <h2 class="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
          专业技能
        </h2>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="skill in content.skills" :key="skill.id" class="flex items-center gap-2">
            <span class="font-medium text-gray-900">{{ skill.name }}</span>
            <span class="text-xs text-gray-500">({{ ['了解','熟悉','掌握','精通','专家'][skill.level - 1] }})</span>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <h2 class="text-base font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" :style="{ borderColor: config.primaryColor, color: config.primaryColor }">
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
