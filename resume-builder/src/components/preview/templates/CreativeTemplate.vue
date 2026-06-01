<template>
  <div class="bg-white min-h-full">
    <!-- Header -->
    <div class="relative p-8 text-white" :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
          {{ (content.personal.name || '姓')[0] }}{{ (content.personal.name || '名')[1] || '' }}
        </div>
        <div>
          <h1 class="text-3xl font-bold">{{ content.personal.name || '您的姓名' }}</h1>
          <p class="text-white/80 text-lg mt-1">{{ content.personal.title || '求职意向' }}</p>
          <div class="flex gap-4 mt-3 text-sm text-white/70">
            <span v-if="content.personal.phone" class="flex items-center gap-1">
              📞 {{ content.personal.phone }}
            </span>
            <span v-if="content.personal.email" class="flex items-center gap-1">
              ✉️ {{ content.personal.email }}
            </span>
            <span v-if="content.personal.location" class="flex items-center gap-1">
              📍 {{ content.personal.location }}
            </span>
          </div>
        </div>
      </div>
      <!-- Decorative circles -->
      <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
      <div class="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-white/10"></div>
    </div>

    <div class="p-8">
      <!-- Education -->
      <div v-if="content.education?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" :style="{ backgroundColor: config.primaryColor }">📚</span>
          教育背景
        </h2>
        <div class="ml-10 space-y-4">
          <div v-for="edu in content.education" :key="edu.id" class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full" :style="{ '--tw-before-bg': config.primaryColor } as any">
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-gray-900">{{ edu.school }}</span>
              <span class="text-sm text-gray-500">{{ edu.period.start }} - {{ edu.period.end }}</span>
            </div>
            <p class="text-gray-600 text-sm">{{ edu.major }} · {{ edu.degree }}</p>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" :style="{ backgroundColor: config.primaryColor }">💼</span>
          工作经历
        </h2>
        <div class="ml-10 space-y-4">
          <div v-for="exp in content.experience" :key="exp.id" class="bg-gray-50 rounded-lg p-4">
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-gray-900">{{ exp.company }}</span>
              <span class="text-sm text-gray-500">{{ exp.period.start }} - {{ exp.period.end }}</span>
            </div>
            <p class="text-sm" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
            <p v-if="exp.description" class="text-sm text-gray-600 mt-2">{{ exp.description }}</p>
            <ul v-if="exp.highlights?.length" class="mt-2 space-y-1">
              <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600">
                ✨ {{ h }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" :style="{ backgroundColor: config.primaryColor }">🚀</span>
          项目经历
        </h2>
        <div class="ml-10 space-y-4">
          <div v-for="proj in content.projects" :key="proj.id" class="bg-gray-50 rounded-lg p-4">
            <div class="flex justify-between items-baseline">
              <span class="font-semibold text-gray-900">{{ proj.name }}</span>
              <span class="text-sm text-gray-500">{{ proj.period.start }} - {{ proj.period.end }}</span>
            </div>
            <p class="text-sm" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
            <p v-if="proj.description" class="text-sm text-gray-600 mt-2">{{ proj.description }}</p>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length" class="mb-8">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" :style="{ backgroundColor: config.primaryColor }">⚡</span>
          专业技能
        </h2>
        <div class="ml-10 flex flex-wrap gap-2">
          <span v-for="skill in content.skills" :key="skill.id"
                class="px-4 py-2 rounded-full text-sm font-medium text-white"
                :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" :style="{ backgroundColor: config.primaryColor }">👤</span>
          自我评价
        </h2>
        <p class="ml-10 text-gray-600 text-sm leading-relaxed">{{ content.summary }}</p>
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
